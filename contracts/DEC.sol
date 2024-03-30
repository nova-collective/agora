// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

/// @title The Voter's Digital Electoral Cards
/// @author Christian Palazzo <palazzochristian@yahoo.it>
/// @custom:experimental This is an experimental contract.
contract DEC {
    address public owner;

    constructor() {
        /// @dev only the owner of the contract has write permissions
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice This is the Digital Electoral Card, emitted by a public third-party authority and owned by the Voter
    /// @dev This data is encrypted with the Voter's public address and only the Voter can decrypt it using the private key
    struct decData {
        string taxCode;
        string municipality;
        string province;
        string region;
        string country;
    }

    event DECEncrypted(address indexed owner, bytes encryptedData);

    /// @notice This function is used to encrypt ad digitally sign a DEC
    function encryptDEC(
        decData memory dec
    ) public onlyOwner returns (bytes memory) {
        bytes memory encodedData = abi.encodePacked(
            dec.taxCode,
            dec.municipality,
            dec.province,
            dec.region,
            dec.country
        );
        bytes32 hashedData = keccak256(encodedData);
        bytes memory signature = signData(hashedData);

        emit DECEncrypted(msg.sender, abi.encodePacked(hashedData, signature));

        return abi.encodePacked(hashedData, signature);
    }

    /// @notice  This function is used to digitally sign the data
    function signData(bytes32 data) private pure returns (bytes memory) {
        bytes32 hash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", data)
        );
        bytes1 v = bytes1(0);
        bytes32 r = bytes32(0);
        bytes32 s = uintToBytes32(1);
        return abi.encodePacked(ecrecover(hash, uint8(v), r, s), r, s);
    }

    /// @notice this function is used in signData function
    function uintToBytes32(uint256 x) private pure returns (bytes32) {
        return bytes32(x);
    }
}
