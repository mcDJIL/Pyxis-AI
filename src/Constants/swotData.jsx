// swotData.jsx

import React from 'react';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle } from 'lucide-react';

export const swotData = [
  {
    id: 'strengths',
    title: "Strengths",
    icon: <TrendingUp size={18} />,
    themeColor: "green",
    items: [
      "Proprietary NLP engine reduces integration time by 40%.",
      "High net dollar retention (124%) among enterprise cohorts."
    ]
  },
  {
    id: 'weaknesses',
    title: "Weaknesses",
    icon: <TrendingDown size={18} />,
    themeColor: "gray",
    items: [
      "Heavy reliance on single cloud provider (AWS) increases margin risk.",
      "Extended sales cycles (avg 90 days) strain working capital."
    ]
  },
  {
    id: 'opportunities',
    title: "Opportunities",
    icon: <Lightbulb size={18} />,
    themeColor: "blue",
    items: [
      "Expansion into EMEA markets via strategic reseller partnerships.",
      "Upselling new analytics module to existing user base in Q4."
    ]
  },
  {
    id: 'threats',
    title: "Threats",
    icon: <AlertTriangle size={18} />,
    themeColor: "red",
    items: [
      "Incumbents bundling similar AI features for free.",
      "Potential macroeconomic tightening delaying enterprise IT spend."
    ]
  }
];