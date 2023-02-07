// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./types/MarketTypes.sol";

contract NFTCollection is ERC1155, Ownable {
    string _baseURI = "";
    mapping(uint64 => MarketTypes.MockDeal) deals;

    constructor(string memory _uri) ERC1155("") {
        _baseURI = _uri;
    }

    function uri(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked(_baseURI, Strings.toString(id), '.json'));
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, string[] memory _cids, bytes memory data)
        public
        onlyOwner
    {
        for(uint8 i=0; i<ids.length;i++) {
            addMockData(_cids[i], ids[i]);
        }
        _mintBatch(to, ids, amounts, data);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        _burn(account, id, amount);
    }

    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    } 

    function _setURI(string memory newuri) internal virtual override {
        _baseURI = newuri;
    }


    function addMockData(string memory cid, uint256 id) internal virtual{
        MarketTypes.MockDeal memory deal;
        deal.id = uint64(id);
        deal.cid = cid;
        deal.size = 8388608;
        deal.verified = false;
        deal.client = "t01109";
        deal.provider = "t01113";
        deal.label = "mAXCg5AIg8YBXbFjtdBy1iZjpDYAwRSt0elGLF5GvTqulEii1VcM";
        deal.start = 25245;
        deal.end = 545150;
        deal.price_per_epoch = 1100000000000;
        deal.provider_collateral = 0;
        deal.client_collateral = 0;
        deal.activated = 1;
        deal.terminated = 0;
        deals[deal.id] = deal;
    }
}
