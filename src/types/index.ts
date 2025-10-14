export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: number
    name: string
    email: string
    salla_store: {
      id: number
      user_id: number
      salla_id: string
      merchant_id: string
      domain: string
      merchant_token: string
      merchant_refresh_token: string
      merchant_name: string
      avatar: string
      created_at: string
      updated_at: string
      is_active: number
      expires_at: string
    }
    package: {
      id: number
      name: string
      platform: string
      platform_package_id: string
      plan_type: string
      plan_period: number
      price: string
      price_before_discount: string
      tax: string
      tax_value: string
      total: string
      initialization_cost: string
      is_active: boolean
      features: any[]
      created_at: string
      updated_at: string
      description: string
      sort: number
      laravel_through_key: number
    }
    salla_subscription: {
      id: number
      subscription_id: number
      merchant_id: string
      plan_details: {
        id: number
        tax: string
        price: string
        total: string
        app_name: string
        app_type: string
        end_date: string
        features: any[]
        plan_name: string
        plan_type: string
        tax_value: string
        created_at: string
        start_date: string
        plan_period: string
        app_description: string
        subscription_at: string
        initialization_cost: number
        price_before_discount: number
      }
      plan_name: string
      platform: string
      package_id: number
      subscription_status: string
      start_date: string
      end_date: string
      subscription_at: string
      created_at: string
      updated_at: string
      user_id: number
    }
    salla_subscription_history: Array<{
      id: number
      user_subscription_id: number
      status: string
      payload: {
        data: {
          id: number
          tax: string
          price: string
          total: string
          app_name: string
          app_type: string
          end_date: string
          features: any[]
          plan_name: string
          plan_type: string
          tax_value: string
          created_at: string
          start_date: string
          plan_period: string
          app_description: string
          subscription_at: string
          initialization_cost: number
          price_before_discount: number
        }
        event: string
        merchant: number
        created_at: string
      }
      start_date: string
      end_date: string
      price: string
      price_before_discount: string
      tax: string
      tax_value: string
      total: string
      features: any[]
      plan_name: string
      plan_type: string
      plan_period: number
      coupon: string | null
      created_at: string
      updated_at: string
      platform: string | null
      laravel_through_key: number
    }>
    has_active_salla_subscription: boolean
    created_at: string
  }
  export interface Tool {
    id: number,
    name: string,
    description?: string,
    type: string,
    identifier: string,
    is_available_in_package: boolean,
    installation_count: number
    }

   export interface ToolInputField {
      name: string;
      label: string;
      type: string;
      default_value: string | number ;
      min?: number;
      max?: number;
      step?: number;
      class: string;
      id: string;
      property?: string;
    }
    
   export interface ToolInputGroup {
      title: string;
      isOpen: boolean;
      class: string;
      inputs: ToolInputField[];
    }
    
    interface ToolData {
      id: number;
      name: string;
      description: string | null;
      type: string;
      identifier: string;
      inputs: ToolInputGroup[];
      desktop_inputs: ToolInputGroup[];
      mobile_inputs: ToolInputGroup[];
      main_inputs: ToolInputGroup[];
      content: string;
      installation_count: number;
    }
    
    export interface ToolDetails {
        tool: ToolData;
        rendered_html: string;
      
    }
    export interface InstalledTool {
  id: number
  name: string
  type: string
  created_at: string
  status: string
  tool_id: number
  active: number
  tool: {
    identifier: string
    type: string
  }
}
