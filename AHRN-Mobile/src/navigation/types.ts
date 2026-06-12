export type HomeownerTabParamList = {
  Dashboard: undefined;
  Forecast: undefined;
  Bids: undefined;
  Job: undefined;
};

export type TechnicianTabParamList = {
  TechFeed: undefined;
  TechJob: undefined;
  TechComplete: undefined;
};

export type AdminTabParamList = {
  AdminOverview: undefined;
  AdminDisputes: undefined;
  AdminCompliance: undefined;
};

export type SuperAdminTabParamList = {
  SuperAI: undefined;
  SuperGovernance: undefined;
};

export type RootTabParamList = HomeownerTabParamList &
  TechnicianTabParamList &
  AdminTabParamList &
  SuperAdminTabParamList & {
    Technician: undefined;
    Admin: undefined;
    SuperAdmin: undefined;
  };

export type AuthStackParamList = {
  RoleSelect: undefined;
  RoleLogin: undefined;
};
