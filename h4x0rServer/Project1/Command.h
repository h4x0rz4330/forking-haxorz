#pragma once
#include <string>
#include <vector>
#include <sstream>
//#include "ServerManager.h"
#include "Client.h"

class ServerManager;
class Client;
class Lobby;

class Command
{
protected:
	vector<std::string> * argList;
	string cmdArgs;
	Client * clientActor;
        ServerManager * sm;
public:
	Command();
	virtual void GetClient(Client * actor);
	virtual void Initialize(string inArgs);
	void splitArgs();

	~Command();
	virtual bool Execute() = 0;
	virtual Command* Clone() = 0;
};


// Commands From Client
class DisconnectCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new DisconnectCommand();
	}
};

class PlayCardCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new PlayCardCommand();
	}
};

class NewAccountCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new NewAccountCommand();
	}
};

class LoginCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new LoginCommand();
	}
};

class CreateGameCommand : public Command {
private:
	Lobby * myLobby;
public:
	bool Execute();
	Command * Clone() {
		return new CreateGameCommand();
	}
};

// Commands From Server
class UpdateGameCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new UpdateGameCommand();
	}
};

class UpdateLobbyCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new UpdateLobbyCommand();
	}
};

class UpdatePlayerCommand : public Command {
public:
	bool Execute();
	Command * Clone() {
		return new UpdatePlayerCommand();
	}
};

class LoginCheckCommand : public Command {
public:
//	void Initialize(string inArgs);
	bool Execute();
	Command * Clone() {
		return new LoginCheckCommand();
	}
};
