export type SportLocation = {
  id: string;
  name: string;
  leagues: League[];
};

export type League = {
  id: string;
  name: string;
  eventDateGroups: EventDateGroup[];
};

export type EventDateGroup = {
  date: string;
  events: SportEvent[];
};

export type SportEvent = {
  id: string;
  fixture: Fixture;
  markets: Market[];
};

export type Fixture = {
  startDate: string;
  type: string;
  participants: FixtureParticipant[];
  status: string;
};

export type Market = {
  marketId: string;
  betCode: string;
  name: string;
  picks: Pick[];
};

export type Pick = {
  id: string;
  name: string;
  odds: number;
};

export type FixtureParticipant = {
  id: string;
  name: string;
  position: string;
};
