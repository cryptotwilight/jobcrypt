//"SPDX-License-Identifier: UNLICENSED"
pragma solidity >0.8.0 <0.9.0;
/**
 * @title Job Crypt Core contract 
 * @dev this contract provides the posting payment services and job search services for the Job Crypt dApp
 */

contract JobCrypt { 
    
    struct Job { 
        string cid; 
        string category; 
        string [] skills; 
        uint256 postingDate; 
        uint256 fee; 
        uint256 expiryDate; 
        uint256 term; 
        address feePaymentCurrency; 
    }
    
    mapping(string=>string[]) jobSummaryCidsByCategory; 
    mapping(string=>string[]) jobSummaryCidsBySkill; 
    
    mapping(string=>mapping(string=>mapping(string=>bool))) jobSummaryCidStatusBySkillByCategory; 
    
    mapping(address=>Job[]) jobsByPoster; 
    
    
    function postJob(string memory _cid, string memory _category, string [] memory _skills, uint256 _postingDate, uint256 _expiryDate ,uint256 _fee, address _erc20Address  ) payable external returns (uint256 _txnId) {
        Job memory job = Job({
                        cid : _cid, 
                        category : _category, 
                        skills : _skills,
                        postingDate : _postingDate, 
                        fee : _fee, 
                        expiryDate : _expiryDate, 
                        term : (_expiryDate - _postingDate),
                        feePaymentCurrency : _erc20Address
                    });
        jobsByPoster[msg.sender].push(job);
        
        jobSummaryCidsByCategory[_category].push(_cid); 
        
        for(uint x ; x < _skills.length; x++) {
            string memory skill = _skills[x];
            jobSummaryCidsBySkill[skill].push(_cid);
            jobSummaryCidStatusBySkillByCategory[_category][skill][_cid] = true; 
        }
        _txnId = generateTxId();
        return _txnId; 
    }
    
    function searchJobs(string memory _category, string memory _skill ) external view returns(string [] memory _summaryCids) {
        string [] memory cids = jobSummaryCidsBySkill[_skill];
        string [] memory cidBuffer = new string[](cids.length);
        uint256 y =0; 
        for(uint256 x = 0; x < cids.length; x++) {
            string memory cid = cids[x];
            if(jobSummaryCidStatusBySkillByCategory[_category][_skill][cid]){
                cidBuffer[y] = cid; 
                y++;
            }
        }
        _summaryCids = cidBuffer; 
        return cidBuffer; 
    }
    
    
    function generateTxId() internal view returns (uint256 _txId) {
        return block.timestamp; 
    }
}