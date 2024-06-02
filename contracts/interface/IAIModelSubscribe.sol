// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IAIModelSubscribe {
    function isSubscribed(address user) external  view returns(bool);
}