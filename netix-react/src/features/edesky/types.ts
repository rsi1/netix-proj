export interface Meta {
  timestamp: string;
  user: string;
  requested_params: string;
  dashboards_count: number;
}

export interface Dashboard {
  name?: string;
  category?: string;
  edesky_id?: number;
  edesky_url?: string;
  nuts3_name?: string;
  nuts4_name?: string;
  ruian_kod?: number;
}

export interface EDeskyResponse {
  version: number;
  meta: Meta;
  dashboards: Dashboard[];
}
