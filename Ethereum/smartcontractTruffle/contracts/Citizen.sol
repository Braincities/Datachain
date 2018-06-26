pragma solidity ^0.4.21;


/**
 * @title Citizen
 * Smart contract that represent a citizen with name, data vault link and dc wallet
 */


import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';



contract Citizen is Ownable {

  string firstName;
  string familyName;
  string dataLink;
  address citizenAddress;
  address manager;
  bool approved;
  
  
  

  constructor(string first_name, string family_name, string datavault_link, address citizen_address, address manager_address ) public {
    firstName = first_name;
    familyName = family_name;    
    dataLink = datavault_link;
    citizenAddress = citizen_address;
    manager = manager_address;    
    approved = false;
  }
  
  function SendApproval(bool approval) onlyManager public{
    approved = approval;
  }

  function Quit() onlyOwner public{
  	selfdestruct(owner);
  }
  
  function Remove() onlyManager public{
  	selfdestruct(owner);
  }
  
  function AskData(string dataname, uint256 price) public {
  	//dataLink.call(dataname,price); // how to make link to data ??
  }
  
  modifier onlyManager() {
    require(msg.sender == manager);
    _;
  }
  
  


}
