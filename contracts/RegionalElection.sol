// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "./Election.sol";

/// @title The Regional Election smart contract
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract RegionalElection is Election {

    constructor(uint256 _electionStart, uint256 _electionEnd) Election(_electionStart, _electionEnd) {

    }

}