// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

/// @title The Voter's Digital Electoral Card
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DEC {
    address public owner;
    bytes taxCode;
    bytes municipality;
    bytes region;
    bytes country;

    constructor(
        bytes memory _taxCode,
        bytes memory _municipality,
        bytes memory _region,
        bytes memory _country
    ) {
        /// @dev only the owner of the contract has write permissions
        owner = msg.sender;
        taxCode = _taxCode;
        municipality = _municipality;
        region = _region;
        country = _country;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setTaxCode(bytes memory _taxCode) public onlyOwner {
        taxCode = _taxCode;
    }

    function getTaxCode() public view returns (bytes memory) {
        return taxCode;
    }

    function setMunicipality(bytes memory _municipality) public onlyOwner {
        municipality = _municipality;
    }

    function getMunicipality() public view returns (bytes memory) {
        return municipality;
    }

    function setRegion(bytes memory _region) public onlyOwner {
        region = _region;
    }

    function getRegion() public view returns (bytes memory) {
        return region;
    }

    function setCountry(bytes memory _country) public onlyOwner {
        country = _country;
    }

    function getCountry() public view returns (bytes memory) {
        return country;
    }


}
