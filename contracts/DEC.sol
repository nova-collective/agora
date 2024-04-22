// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

/// @title The Voter's Digital Electoral Card
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DEC {
    address public owner;
    Encrypted public taxCode;
    Encrypted public municipality;
    Encrypted public region;
    Encrypted public country;

    struct Encrypted {
        string hash;
        string chiper;
        string nonce;
    }

    constructor(
        Encrypted memory _taxCode,
        Encrypted memory _municipality,
        Encrypted memory _region,
        Encrypted memory _country
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

    function setTaxCode(Encrypted memory _taxCode) external onlyOwner {
        taxCode = _taxCode;
    }

    function setMunicipality(Encrypted memory _municipality) external onlyOwner {
        municipality = _municipality;
    }

    function setRegion(Encrypted memory _region) external onlyOwner {
        region = _region;
    }

    function setCountry(Encrypted memory _country) external onlyOwner {
        country = _country;
    }
}
