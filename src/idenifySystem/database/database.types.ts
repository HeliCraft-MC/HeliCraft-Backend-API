interface dbConfig {
    host: string,
    port: number,
    databaseName: string,
    user: {
        name: string,
        password: string
    },
    tablePassport: string,
    tableStates: string
};

interface user {
    username: string,
    password: string
};

interface Passport {
  passportId: string;
  nickname: string;
  passportIssuedBy: string;
  stateOfIssue: string;
  issuedOn: Date;
  arrestedIn: string[];
  inPrison: {
    inPrison: boolean;
    state: string;
    by: string;
  };
}

interface State {
  stateId: string;
  stateName: string;
  stateRuler: string;
  stateMembers: string[];
  statePolicemans: string[];
  diplomaticStatus: {
    StateID: string;
    status: number;
  }[];
}

export { dbConfig, user, Passport, State };