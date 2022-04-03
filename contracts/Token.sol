//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, ERC20Burnable, Ownable {


    constructor() ERC20("OverTheTop", "OTT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());

    }



    function mint(address to, uint256 amount) public onlyOwner {
        Rewarder rewarder = Rewarder(to);
        rewarder.addHolder();
        _mint(to, amount);
    }

}


contract Rewarder {

    address token;

    address[] holders;

    uint256 rewardAmount = 20;

    constructor(address _token) {
        token = _token;
    }

    function addHolder() public payable {
        require(msg.value > 0);
        holders.push(msg.sender);
        IERC20(token).transfer(msg.sender, msg.value);
    }

    function rewardHolders() public {
        for (uint256 i = 0; i < holders.length; i++) {
            IERC20(token).transfer(holders[i], rewardAmount);
        }
    }
}