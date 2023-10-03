// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem{

	struct Candidates{
		string name;
		voters[] Candidatelist;
		uint256 votes;
	}

	struct voters{
		address votersAddress;
		string name;
		uint256 VotesOfUsers;
	}

	struct AllVotes{
		uint256 votes;
		address votersAdrr;
	}

	mapping(address => Candidates) Candidatelist;
	mapping(address => voters) VotersList;
	AllVotes[] getAllVotes;

	function CheckifUserExist(address addr) public view returns(bool) {
		return bytes (Candidatelist[addr].name).length > 0;
	}

	function registerAsVoters(string calldata name) external{
		require(CheckifUserExist(msg.sender) == false, "Usre alredy exist");
		require(bytes(name).length > 0, "");
		VotersList[msg.sender].name = name;
	}

	
	function registerAsCandidate(string calldata name) external{
		require(CheckifUserExist(msg.sender) == false, "Usre alredy exist");
		require(bytes(name).length > 0, "");
		Candidatelist[msg.sender].name = name;
	}

	function vote(address candidatesAddress) public  {
		 require(CheckifUserExist(msg.sender) , "Create an Account");
		 require(CheckifUserExist(candidatesAddress), "Candidate does not an exist");
		 require(msg.sender != candidatesAddress, "You can not vote for your self");
		 Candidatelist[candidatesAddress].votes ++;
		 VotersList[msg.sender].VotesOfUsers ++;
		uint256 incrementedVote = getAllVotes.length + 1;
		getAllVotes.push(AllVotes(incrementedVote, msg.sender));
	}

	function getAllVotess() public view returns(AllVotes[] memory) {
		return getAllVotes;
	}


}