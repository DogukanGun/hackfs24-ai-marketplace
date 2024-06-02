// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "DePinFilecoin/AIModel.sol";
import "DePinFilecoin/interface/IAIModel.sol";
import "DePinFilecoin/AIModelSubscribe.sol";

contract Factory {

    address creater;
    address bridgeAddress;

    struct AIModelContract{
        string modelName;
        address contractAddress;
        uint256 subscriptionFee;
        uint256 totalSubscribed;
        address subscriptionContractAddress;
    }

    AIModelContract[] public  aiModels;

    constructor(address _bridgeAddress){
        bridgeAddress = _bridgeAddress;
    }

    function deployModel(string memory repoName,string memory modelName,uint256 subscriptionFee,address erc20) public {
        address deployedModelContractAddress = address(new AIModel(bridgeAddress,repoName));
        address deployedModelSubscriptionContractAddress = address(new AIModelSubscribe(erc20,deployedModelContractAddress,msg.sender,subscriptionFee));
        IAIModel aiModel = IAIModel(deployedModelContractAddress);
        aiModel.setAiModelSubscriberContract(deployedModelSubscriptionContractAddress);
        aiModels.push(AIModelContract(modelName,deployedModelContractAddress,subscriptionFee,0,deployedModelSubscriptionContractAddress));
    }
    
}