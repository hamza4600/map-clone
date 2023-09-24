export const COLUMNS = {
  pricing_strategy: {
    columns: {
      strategy_start_date: {
        schema: 'date'
      },
      strategy_discount_method: {
        label: 'Discount Strategy'
      },
      initial_imv: {
        label: 'Initial IMV',
        schema: 'dollars'
      },
      addition_deduction_amount: {
        label: 'Adds/Deducts',
        schema: 'dollars'
      },
      addition_deduction_percentage_applied: {
        label: 'Adds/Deducts Applied (%)',
        schema: 'percent'
      },
      addition_deduction_amount_applied: {
        label: 'Adds/Deducts Applied ($)',
        schema: 'dollars'
      },
      initial_goal_type: {
      },
      initial_label: {
      },
      initial_amount: {
        label: 'Initial $',
        schema: 'dollars'
      },
      initial_amount_adjustment: {
        label: 'Initial $ Adjustment',
        schema: 'dollars'
      },
      initial_net_amount: {
        label: 'Initial Net $',
        schema: 'dollars'
      },
      initial_net_amount_label: {
        label: 'Initial Net $ IMV Label'
      },
      above_below_imv_amount: {
        label: '($) Above / Below IMV',
        schema: 'dollars'
      },
      above_below_imv_percentage: {
        label: '(%) Above / Below IMV',
        schema: 'percent'
      },
      target_goal_type: {
      },
      target_goal_label: {
      },
      target_amount: {
        label: 'Target $',
        schema: 'dollars'
      },
      target_amount_adjustment: {
        label: 'Target $ Adjustment',
        schema: 'dollars'
      },
      target_net_amount: {
        label: 'Target Net $',
        schema: 'dollars'
      },
      depreciation_amount_per_month: {
        label: 'Depreciation $ Per Month',
        schema: 'dollars'
      },
      estimated_depreciation_amount: {
        label: 'Est. Depreciation',
        schema: 'dollars'
      },
      estimated_target_price_amount: {
        label: 'Est. Target Price',
        schema: 'dollars'
      },
      acv: {
        label: 'ACV',
        schema: 'dollars'
      },
      gross_amount_before_recondition: {
        label: 'Gross Before Recon',
        schema: 'dollars'
      },
      dms_invoice_amount: {
        label: 'DMS Invoice',
        schema: 'dollars'
      },
      reconditioning_cost: {
        label: 'Reconditioning',
        schema: 'dollars'
      },
      net_gross_amount: {
        label: 'Net Gross',
        schema: 'dollars'
      },
      number_of_strategy_days: {
      },
      imv_cpo: {
        label: 'IMV CPO'
      }
    }
  },
  initial_pricing: {
    columns: {
      price_start_date: {
        schema: 'date'
      },
      initial_price: {
        schema: 'dollars'
      },
      initial_imv_price: {
        label: 'Initial IMV',
        schema: 'dollars'
      },
      initial_imv_label: {
        label: 'Initial Label'
      },
      initial_price_imv_diff: {
        label: 'Initial $ From IMV',
        schema: 'dollars'
      },
      initial_imv_cpo_badge: {
        label: 'Initial CPO Badge'
      }
    }
  },
  current_pricing: {
    columns: {
      published_date_age: {
        label: 'Age of last Published',
        schema: 'age'
      },
      total_published: {
        label: 'Number Published'
      },
      current_price: {
        schema: 'dollars'
      },
      current_imv_price: {
        label: 'Current IMV',
        schema: 'dollars'
      },
      current_imv_label: {
        label: 'Current Label'
      },
      curent_price_imv_diff: {
        label: 'Current $ From IMV',
        schema: 'dollars'
      },
      current_imv_cpo_badge: {
        label: 'Current CPO Badge'
      },
      total_changed_amount: {
        label: 'Total $ Reduced',
        schema: 'dollars'
      },
      total_changed_percent: {
        label: 'Total % Reduced',
        schema: 'percent'
      }
    }
  },
  current_imv: {
    label: 'Current IMV',
    columns: {
      imv_age: {
        label: 'Age of IMV',
        schema: 'age'
      },
      imv_great_price: {
        label: 'IMV Great',
        schema: 'dollars'
      },
      current_price_imv_great_price_diff: {
        label: 'vs IMV',
        schema: 'dollars'
      },
      imv_good_price: {
        label: 'IMV Good',
        schema: 'dollars'
      },
      current_price_imv_good_price_diff: {
        label: 'vs IMV',
        schema: 'dollars'
      },
      imv_fair_price: {
        label: 'IMV Fair',
        schema: 'dollars'
      },
      current_price_imv_fair_price_diff: {
        label: 'vs IMV',
        schema: 'dollars'
      },
      imv_high_price: {
        label: 'IMV High',
        schema: 'dollars'
      },
      current_price_imv_high_price_diff: {
        label: 'vs IMV',
        schema: 'dollars'
      },
      imv_overpriced_price: {
        label: 'IMV Overpriced',
        schema: 'dollars'
      },
      current_price_imv_overpriced_price_diff: {
        label: 'vs IMV',
        schema: 'dollars'
      }
    },
  }
}
