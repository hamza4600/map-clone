const SESSION_LENGTH = 3600000; // 1 hour
//const SESSION_LENGTH = 125000; // 2m 5s

const tokenExp = () => new Date(new Date().getTime() + SESSION_LENGTH);

const list = (prototype = {}, length = 5)  => {
  const result = [];
  for (let i = 0; i < length; i++) result.push(prototype);
  return result;
}

const listVehicles = (
  {
    page = 1,
    rowsOnPage = 25,
  } = {},
  item = () => {}
) => {
  const total = 177;
  const length = Math.min(rowsOnPage, total - (page - 1) * rowsOnPage);
  return ({
    total_records: total,
    result: list(item(), length)
  })
}

const user = props => ({
  "user_account_id": "1",
  "role_key": "APPUSR",
  //"role_key": "APPADM",
  "user_account_role_id": 3,
  "first_name": "Jack",
  "last_name": "Beanstalk",
  "email_address": "jackb@helloworld.com",
  "cell_phone": "234-567-8900",
  "dealership_store_id": "1",
  "stores": [
    {
      "dealership_store_id": "1",
      "store_name": "ABC Audi"
    },
    {
      "dealership_store_id": "2",
      "store_name": "XYZ Honda"
    }
  ],
  ...props
})

export default {


  // SESSION
'POST https://apidev.genevamedia.com/mapa/auth/login/': ({ method, url, params, urlparams, headers }) => params.username !== 'hsmith' || params.password !== 'foobar' ? ({
    status: 200,
    data: {
      "status": false,
      "message": "Invalid username or password."
    }
  }) : ({
    status: 200,
    data: {
      "token": "eyJ0eXAi...",
      "token_exp": tokenExp(),
      "user" : user()
    }
  }),
  'POST https://apidev.genevamedia.com/mapa/logout/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "status": "true",
      "message": "Logged out successfully."
    }
  }),
  'POST https://apidev.genevamedia.com/mapa/extend-session/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "status": "true",
      "token_exp": tokenExp(),
    }
  }),
  'POST https://apidev.genevamedia.com/mapa/security-code-request/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": "true"
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/security-code-authentication/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": "true"
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/auth/change-dealership/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        dealership_store_id: params.dealership_store_id
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/reset-password/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "status": true
    }
  }),
  'POST https://apidev.genevamedia.com/mapa/reset-password/token-confirm/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "status": true
    }
  }),
  'POST https://apidev.genevamedia.com/mapa/reset-password/new-password/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "status": true
    }
  }),


  // LOOKUPS

  'GET https://apidev.genevamedia.com/mapa/vehicle/inventory-total-summary/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: {
      "ALL": "177",
      "CPO": "50",
      "FLG": "23",
      "15D": "13",
      "30D": "22",
      "45D": "30",
      "60D": "13",
      "75D": "11",
      "90D": "37",
      "120D": "10",
      "120DP": "26"
    }
  }),
  'GET https://apidev.genevamedia.com/mapa/vehicle-purchase-source/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: [
      {
        "vehicle_purchase_source_id": "1",
        "purchase_source": "Trade"
      },
      {
        "vehicle_purchase_source_id": "2",
        "purchase_source": "Surplus"
      },
      {
        "vehicle_purchase_source_id": "3",
        "purchase_source": "Resale"
      },
    ]
  }),
  'GET https://apidev.genevamedia.com/mapa/discount-strategy/list/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: [
      {
        discount_strategy_id: 1,
        char_key: 'LINEAR',
        discount_strategy: 'Linear'
      },
      {
        discount_strategy_id: 2,
        char_key: 'GRADUL',
        discount_strategy: 'Gradual'
      },
      {
        discount_strategy_id: 3,
        char_key: 'AGRSIV',
        discount_strategy: 'Aggressive'
      }
    ]
  }),
  'GET https://apidev.genevamedia.com/mapa/user-role/list/': ({ method, url, params, urlparams, headers }) => ({
    status: 200,
    data: [
      {
    		user_account_role_id: "1",
    		char_key: "APPUSR",
    		role: "Application User",
    		description: "Allowed to perform..."
    	},
      {
    		user_account_role_id: "2",
    		char_key: "DADMIN",
    		role: "Dealership Store Admin",
    		description: "Allowed to perform..."
    	},
      {
    		user_account_role_id: "3",
    		char_key: "APPADM",
    		role: "Application Admin",
    		description: "Allowed to perform..."
    	}
    ]
  }),


  // LIST

  'GET https://apidev.genevamedia.com/mapa/vehicle/inventory/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: listVehicles(params, () => ({
        "vehicle_id": "1",

        /* Vehicle Info */
          "vehicle_info": {
              "age": "230",
              "stock_no": "55522A",
              "vin": "WAAH...25937",
              "year": "2018",
              "make": "Audi",
              "model": "A7",
              "trim": "Prestige",
              "exterior_color": "White",
              "mileage": "11233",
              "cpo_eligible": "Y",

              /* Data from DSL */
              "delivered_date": "10/1/2019",
              "actual_sold_price": "74000.00"
          },


          /* Initial Pricing */
          "initial_pricing": {
              "price_start_date": "9/1/2019",
              "initial_price": "75000.00",
              "initial_imv_price": "75100.00",
              "initial_imv_label": "Fair",
              "initial_price_imv_diff": "-100.00",
              "initial_imv_cpo_badge": "N"
          },

          /* Current Pricing */
          "current_pricing": {
              "published_date_age": "5",
              "total_published": "3",
              "current_price": "74000.00",
              "current_imv_price": "74500.00",
              "current_imv_label": "Great",
              "curent_price_imv_diff": "-500.00",
              "current_imv_cpo_badge": "Y",
              "total_changed_amount": "-1000.00",
              "total_changed_percent": "0.0133"
          },


          /* Current IMV */
          "current_imv": {
              "imv_age": "5",
              "imv_great_price": "74500.00",
              "current_price_imv_great_price_diff": "-500.00",
              "imv_good_price": "74800.00",
              "current_price_imv_good_price_diff": "-800.00",
              "imv_fair_price": "74900.00",
              "current_price_imv_fair_price_diff": "-900.00",
              "imv_high_price": "75100.00",
              "current_price_imv_high_price_diff": "-1100.00",
              "imv_overpriced_price": "75900.00",
              "current_price_imv_overpriced_price_diff": "-1900.00"
          },

          /* Pricing Strategy */
          "pricing_strategy": {
              "strategy_start_date": "9/1/2019",
              "strategy_discount_method": "Linear",
              "initial_imv": "75000.00",
              "addition_deduction_amount": "1000.00",
              "addition_deduction_percentage_applied": "100",
              "addition_deduction_amount_applied": "1000.00",
              "initial_goal_type": "Price",
              "initial_label": "Good",
              "initial_amount": "74000.00",
              "initial_amount_adjustment": "1000.00",
              "initial_net_amount": "73000.00",
              "initial_net_amount_label": "Good",
              "above_below_imv_amount": "2000.00",
              "above_below_imv_percentage": "-1.2",
              "target_goal_type": "Price",
              "target_goal_label": "Good",
              "target_amount": "74000.00",
              "target_amount_adjustment": "1000.00",
              "target_net_amount": "73000.00",
              "depreciation_amount_per_month": "100.00",
              "estimated_depreciation_amount": "-600.00",
              "estimated_target_price_amount": "72400.00",
              "acv": "70000.00",
              "gross_amount_before_recondition": "2400.00",
              "dms_invoice_amount": "71000.00",
              "reconditioning_cost": "1000.00",
              "net_gross_amount": "1400.00",
              "number_of_strategy_days": "60",
              "imv_cpo": "Y"
          }
      }))
    }
  },


  // VEHICLE

  'GET https://apidev.genevamedia.com/mapa/vehicle/{vehicelID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        vehicle_id: 1,

        /*** Vehicle info ***/
        "vehicle_info": {
            "vehicle_no": 23,
            "age": "5",
            "vin": "123456GHVVV123456",
            "stock_no": "12345A",
            "year": "2019",
            "make": "Honda",
            "model": "Civic",
            "trim": "EX",
            "exterior_color": "Red",
            "interior_color": "Black",
            "mileage": "19040",
            "purchased_date": "01-20-2021",
            "vehicle_purchase_source_id": 1,
            "date_added": "01-21-2021",
            "original_acv": "15000.00",
            "dms_cost": "14600.00",
            "acv_dms_difference": "400.00",
            "average_difference": "500.00",
            "above_below_average": "-100.00"
        },

        /*** MSRP and Factory Invoice ***/
        "msrp_factory_invoice": {
            "msrp": {
                "provided": true,
                "total_amount": "21000.00",
                "base_amount": "20000.00",
                "factory_options": {
                    "amount": "1000.00",
                    "percent": "5.0"
                },
                "file_name": "msrp.pdf"
            },
            "factory_invoice": {
                "provided": true,
                "total_amount": "21000.00",
                "base_amount": "20000.00",
                "factory_options": {
                    "amount": "1000.00",
                    "percent": "5.0"
                },
                "file_name": "factory_invoice.pdf"
            },
            "factory_option_imv_adjustment": {
                "method": "AMT",
                "amount": "1000.00",
                "percent": "5.0"
            }
        },

        /*** Vehicle History ***/
        "vehicle_history": {
            "carfax": {
                "clean": false,
                "title_branded": true,
                "title_branded_deduction": {
                    "method": "AMT",
                    "amount": "2000.00",
                    "percent": "5"
                },
                "accident_indicator": false,
                "accident_indicator_deduction": {
                    "method": "",
                    "amount": "",
                    "percent": ""
                },
                "file_name": "carfax.pdf"
            },
            "autocheck": {
                "clean": false,
                "title_branded": true,
                "title_branded_deduction": {
                    "method": "AMT",
                    "amount": "2000.00",
                    "percent": "5"
                },
                "accident_indicator": true,
                "accident_indicator_deduction": {
                    "method": "PCT",
                    "amount": "200.00",
                    "percent": "0.05"
                },
                "file_name": "autocheck.pdf"
            },
            "multiple_owner": {
                "total_owners": 2,
                "multiple_owner_deduction": {
                    "method": "AMT",
                    "amount": "500.00",
                    "percent": "1.25"
                }
            }
        },

        /*** Warranty ***/
        "warranty": {
            "factory_warranty": true,
            "service_date": "5/1/2020",
            "file_name": "warranty.pdf",
            "bb_warranty_remaining": {
                "months": "6",
                "miles": "5000"
            },
            "powertrain_warranty_remaining": {
                "months": "6",
                "miles": "5000"
            }
        },

        /*** Mileage ***/
        "mileage": {
            "milage_adjustment":  "-5400",
            "amount_per_mileage_adjustment": "1.25",
            "mileage_imv_adjustment": {
                "amount": "-6780.00",
                "percent": "-16.9"
            }
        },

        /*** Condition ***/
        "condition": {
            "previous_cosmetic_damage": true,
            "previous_cosmetic_damage_repair_cost": "5000.00",
            "previous_cosmetic_damage_deduction": {
                "method": "AMT",
                "amount": "2000.00",
                "percent": "5.0"
            },
            "existing_cosmetic_damage": true,
            "existing_cosmetic_damage_repair_cost": "2000.00",
            "existing_cosmetic_damage_deduction": {
                "method": "AMT",
                "amount": "2000.00",
                "percent": "5.0"
            }
        },

        /*** CPO ***/
        "cpo": {
            "eligible": true,
            "cost": "10000",
            "adjustment": {
                "method": "AMT",
                "amount": "1000.00",
                "percent": "2.5"
            }
        },

        /***Total Addition or Deduction ***/
        "total": {
            "adjustment": {
                "amount": "-9780.00",
                "percent": "-24.0"
            }
        },

        /***pricing option override***/
        "pricing_option": {
            "override": true,
            "amount": "3000.00",
            "percent": "",
            "method": "AMT",
        },

        initial_pricing: {
          start_date: "01-20-2021",
          price: {
            base: '75500.00',
            with_adjustments: '74000.00'
          },
          imv: {
            label: 'Good',
            amount: '76000.00',
            vs_initial: {
              amount: '-500.00',
              percent: '-6.6'
            }
          },
          total_adjustments: {
            amount: '2000.00',
            percent: '2.6'
          },
          cpo: {
            eligible: true,
            cost: '1000.00',
            with_imv: {
              estimate: '77000.00',
              vs_initial: {
                amount: '-1500.00',
                percent: '-1.9'
              }
            }
          }
        },

        initial_strategy: {
          date_added: "01-20-2021",
          pricing_strategy: 'P',
          discount_strategy: 'LINE',
          goal: {
            method: '$1,000 Below Fair',
            amount: '75000.00',
          },
          imv: {
            label: 'Good',
            amount: '76000.00'
          },
          time_to_reach_goal: {
            days_to_reach: 20,
            days_to_achieve: 20,
            days_remaining: 5,
            publish_frequency: 'Monthly'
          },
          discount: {
            total: {
              amount: '1000.00',
              percent: '2.5'
            },
          },
          stagger: {
            active: true,
            range: '5000.00',
            publish_frequency: 'Weekly'
          }
        },

        pricing_adjustments: {
          carfax_autocheck: {
            amount: '5000.00',
            percent: '5.0'
          },
          accident_indicator: {
            amount: '5000.00',
            percent: '5.0'
          },
          multiple_owner: {
            amount: '5000.00',
            percent: '5.0'
          },
          cosmetic_damage: {
            amount: '5000.00',
            percent: '5.0'
          }
        },

        initial_imv: {
          date: "01-20-2021 10:44 AM",
          user: "John Smith",
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          initial_vs_great: '-1500.00',
          initial_vs_good: '-500.00',
          initial_vs_fair: '500.00',
          initial_vs_overpriced: '-2500.00'
        },

        initial_cpo_estimates: {
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          initial_vs_great: '-1500.00',
          initial_vs_good: '-500.00',
          initial_vs_fair: '500.00',
          initial_vs_overpriced: '-2500.00'
        },

        current_pricing: {
          published_date: "01-20-2021",
          days: 10,
          current_price: '75000.00',
          prices_published: 3,
          imv: {
            label: 'Good',
            amount: '76000.00',
            vs_current: {
              amount: '1000.00',
              percent: '1.5'
            }
          },
          discount: {
            amount: '1000.00',
            percent: '1.5'
          },
          cpo: {
            eligible: true,
            cost: '1000.00',
            with_imv: {
              estimate: '77000.00',
              vs_current: {
                amount: '-1500.00',
                percent: '-1.9'
              }
            }
          }
        },

        current_strategy: {
          published_date: "01-20-2021",
          days: 10,
          pricing_strategy: 'P',
          discount_strategy: 'LINE',
          goal: {
            method: '$1,000 Below Fair',
            amount: '75000.00',
          },
          imv: {
            label: 'Good',
            amount: '76000.00'
          },
          time_to_reach_goal: {
            days_remaining: 5
          },
          discount: {
            total: {
              amount: '1000.00',
              percent: '2.5'
            },
            remaining: {
              amount: '500.00',
              percent: '1.25'
            }
          }
        },

        current_imv: {
          date: "01-20-2021 10:44 AM",
          user: "John Smith",
          days: 3,
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          current_vs_great: '-1500.00',
          current_vs_good: '-500.00',
          current_vs_fair: '500.00',
          current_vs_overpriced: '-2500.00'
        },

        current_cpo_estimates: {
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          current_vs_great: '-1500.00',
          current_vs_good: '-500.00',
          current_vs_fair: '500.00',
          current_vs_overpriced: '-2500.00'
        },

        sold_imv: {
          date: "01-20-2021 10:44 AM",
          user: "John Smith",
          days: 3,
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          sold_vs_great: '-1500.00',
          sold_vs_good: '-500.00',
          sold_vs_fair: '500.00',
          sold_vs_overpriced: '-2500.00'
        },

        sold_cpo_estimates: {
          great: '77000.00',
          good: '76000.00',
          fair: '75000.00',
          overpriced: '78000.00',
          sold_vs_great: '-1500.00',
          sold_vs_good: '-500.00',
          sold_vs_fair: '500.00',
          sold_vs_overpriced: '-2500.00'
        },

        pricing_history: [
          {
            date: '9/18/2021',
            user: 'Doe, John',
            cpo: false,
            great: '76000.00',
            good: '75000.00',
            fair: '74000.00'
          },
          {
            date: '9/15/2021',
            user: 'Griffin, Sally',
            cpo: true,
            great: '76000.00',
            good: '75000.00',
            fair: '74000.00'
          },
          {
            date: '9/11/2021',
            user: 'Smith, Avery',
            cpo: undefined,
            great: '76000.00',
            good: '75000.00',
            fair: '74000.00'
          }
        ],

        sold_info: {
          method: 'Retail',
          date: '10/5/2019',
          age: 25,
          initialAge: 10,
          prices_published: 4,
          strategies: 2,
          pricing_strategy: 'P',
          discount_strategy: 'LINE'
        },

        pricing_analysis: {
          sold_price: '75000.00',
          matches_published: true,
          imv: {
            label: 'Fair',
            amount: '74000.00',
            vs_sold: {
              amount: '1000.00',
              percent: '1.4'
            }
          },
          reduction: {
            amount: '3000.00',
            percent: '3.25'
          },
          vs_goal: {
            amount: '130.00',
            percent: '5'
          }
        }
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/vehicle/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicle_id: 23
      }
    }
  },
  'PUT https://apidev.genevamedia.com/mapa/vehicle/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicle_id: urlparams.recordID
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/vehicle/entry-question/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicleId: urlparams.recordID
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/vehicle/imv-pricing/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicleId: urlparams.recordID
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/vehicle/pricing-option/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicleId: urlparams.recordID
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/vehicle/pricing-strategy/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        vehicleId: urlparams.recordID
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/upload-document/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        "fileName": params.fileName
      }
    }
  },
  'POST https://apidev.genevamedia.com/vin-decoder/decode/{vin}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "year": "2015",
        "make": "Volkswagen",
        "model": "Jetta",
        "trim": "",
        "vehicle_type": "Car",
        "body_type": "Sedan",
        "doors": "4",
        "model_number": "",
        "package_code": "",
        "drive_type": "FWD",
        "exterior_colors": [
          "Tornado Red",
          "Pure White",
          "Platinum Gray Metallic"
        ],
        "interior_colors": []
      }
    }
  },
  'GET https://apidev.genevamedia.com/mapa/vehicle/imv-pricing/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        "cpo_badge": true,
        "factory_equipments_all_selected": false,
        "great_price": "40000",
        "good_price": "41000",
        "fair_price": "42000",
        "high_price": "43000",
        "overpriced_price": "45000",
        "imv_proof_screen_capture_file": "imv_screen_capture.png",
        "imv_uri": "",
        "vehicle_detail_uri": ""
      }
    }
  },
  'DELETE https://apidev.genevamedia.com/mapa/vehicle/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true
      }
    }
  },

  // ADMIN

  // USERS
  'GET https://apidev.genevamedia.com/mapa/user/list/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: list({
        "user_account_id": "1",
        "name": "Jack Smith",
        "email_address": "dummy.user@fakeemail.com",
        "user_role": "Application User",
        "username": "jsmith"
      }, 8)
    }
  },
  'GET https://apidev.genevamedia.com/mapa/user/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "user_account_id": "1",
        "first_name": "Jack",
        "last_name": "Smith",
        "email_address": "jack.smith@fakeemail.com",
        "cell_phone": "703-555-1212",
        "dealership_store_id": "1,2,3",
        "user_account_role_id": 3,
        "username": "jsmith"
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/user/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        user_account_id: 1
      }
    }
  },
  'PUT https://apidev.genevamedia.com/mapa/user/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        user_account_id: 1
      }
    }
  },


  // DEALERSHIPS
  'GET https://apidev.genevamedia.com/mapa/dealership-store/list/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: list({
    		"dealership_store_id": "1",
    		"store_name": "BMW of Palace",
    		"store_address": "500 Main Road, Palace, VA 22333",
    		"phone": "703-555-1212",
    		"website": "www.bmwofpalace.com"
    	}, 8)
    }
  },
  'GET https://apidev.genevamedia.com/mapa/dealership-store/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
      	"dealership_store_id": "1",
      	"store_name": "BMW of Palace",
      	"address_line1": "500 Main Road",
      	"address_line2": "",
      	"city": "Palace City",
      	"us_state_id": 23,
      	"postal_code": "23456",
      	"main_phone": "703-555-1212",
      	"website_url": "www.bmwofpalace.com"
      }
    }
  },
  'POST https://apidev.genevamedia.com/mapa/dealership-store/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        status: true,
        dealership_store_id: 1
      }
    }
  },
  'PUT https://apidev.genevamedia.com/mapa/dealership-store/{recordID}/': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 200,
      data: {
        "status": true,
        dealership_store_id: 1
      }
    }
  },

}
