// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "DePinFilecoin/AIModel.sol";

contract Factory {

    address creater;
    address bridgeAddress;

    struct AIModelContract{
        string modelName;
        address contractAddress;
        uint256 subscriptionFee;
        uint256 totalSubscribed;
    }

    AIModelContract[] aiModels;

    constructor(address _creater,address _bridgeAddress){
        creater = _creater;
        bridgeAddress = _bridgeAddress;
    }

    function deployModel(string memory repoName,string memory modelName,uint256 subscriptionFee) public {
        address deployedModelContractAddress = address(new AIModel(bridgeAddress,repoName,creater));
        aiModels.push(AIModelContract(modelName,deployedModelContractAddress,subscriptionFee,0));
    }
    
}