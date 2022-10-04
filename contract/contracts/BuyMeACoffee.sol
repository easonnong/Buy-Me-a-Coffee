// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// BuyMeACoffee deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

contract BuyMeACoffee {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    address payable owner;

    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffe(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "can't but coffee for free!");

        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
