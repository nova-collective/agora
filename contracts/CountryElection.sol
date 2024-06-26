// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./Election.sol";

/// @title The Country Election smart contract
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract CountryElection is Election {

    constructor(
        string memory _name,
        uint256 _registrationStart,
        uint256 _registrationEnd,
        uint8 _votingPoints
    ) Election(_name, _registrationStart, _registrationEnd, _votingPoints) {

    }

}
