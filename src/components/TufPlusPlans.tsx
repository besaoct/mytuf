'use client'

import { CheckCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { BsXCircleFill } from 'react-icons/bs'

const featuresList = {
  beginnerProblems: { label: 'Beginner Problems', included: true },
  curatedProblems: { label: 'Curated Problems', included: true },
  topicContests: { label: 'Topic-Based Contests', included: true },
  mixedContests: { label: 'Mixed Topic Contests', included: true },
  roadmap: { label: 'Personalized Roadmap', included: true },
  customizableSchedule: { label: 'Customizable Schedule', included: true },
  videoSolutions: { label: 'Video Solutions', included: true },
  editorials: { label: 'Detailed Editorials', included: true },
  guessOutput: { label: 'Guess the Output', included: true },
  practicePortal: { label: 'Practice Portal', included: true },
  aiDoubtPortal: { label: 'AI-Assisted Doubt Portal', included: false },
  codeReview: { label: 'Code Review', included: true },
  complexityAnalysis: { label: 'Complexity Analysis', included: true },
  examples: { label: 'Real-Life Examples', included: true },
  richTextEditor: { label: 'Rich Text Editor', included: true },
  weeklySessions: { label: 'Weekly Sessions', included: false },
  progressTracking: { label: 'Progress Tracking', included: true },
  leaderboard: { label: 'Leaderboard', included: true },
  certificate: { label: 'Completion Certificate', included: true },
  community: { label: 'Exclusive Community', included: true },
  affiliateProgram: { label: 'Affiliate Program', included: true },
  multiLanguageSupport: { label: 'Multi-Language Support', included: true },
}

const plans = [
  {
    name: 'Sprint',
    validity: '12 months',
    price: '₹ 5699',
    oldPrice: '₹ 6499',
    offer: '₹3704.35',
    coupon: 'TUFPLUS',
    popular: false,
    features: {
      ...featuresList,
      aiDoubtPortal: { label: 'AI-Assisted Doubt Portal', included: false },
      weeklySessions: { label: 'Weekly Sessions', included: false },
    },
  },
  {
    name: 'Pinnacle',
    validity: '36 months',
    price: '₹ 7599',
    oldPrice: '₹ 9999',
    offer: '₹4999.35',
    coupon: 'TUFPLUS',
    popular: true,
    features: {
      ...featuresList,
      aiDoubtPortal: { label: 'AI-Assisted Doubt Portal', included: true },
      weeklySessions: { label: 'Weekly Sessions', included: true },
    },
  },
]

const FeatureList = ({ features }: { features: typeof plans[0]['features'] }) => (
  <ul className="mt-4 space-y-2">
    {Object.entries(features).map(([key, { label, included }]) => (
      <li key={key} className="flex items-center gap-2 text-sm capitalize">
        {included ? (
          <CheckCircledIcon className="w-5 h-5 text-green-500" />
        ) : (
          <BsXCircleFill className="w-5 h-5 text-red-500" />
        )}
        {label}
      </li>
    ))}
  </ul>
)

const PlanCard = ({ plan }: { plan: typeof plans[0] }) => (
  <div className={`flex flex-col border rounded-md p-4 shadow-sm ${plan.popular ? 'border-green-500' : 'border-gray-500'} bg-white dark:bg-black w-full`}>
    <div className="flex items-center justify-between w-full">
      <h3 className="text-lg font-bold">{plan.name}</h3>
      {plan.popular && <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">POPULAR</span>}
    </div>
    <p className="text-muted-foreground text-xs">{plan.validity}</p>
    <div className="text-3xl font-bold">{plan.price}</div>
    <div className="text-gray-500 line-through">{plan.oldPrice}</div>
    <div className="mt-2 bg-green-100 text-green-800 px-2 py-1 rounded">
      Special Offer: {plan.offer}
      <br />
      Use coupon: <span className="font-bold">{plan.coupon}</span>
    </div>
    <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
      Start Your Journey
    </button>
    <FeatureList features={plan.features} />
  </div>
)

const CoursePlans = () => (
  <div className="flex flex-col md:flex-row justify-center items-start gap-4 w-full h-full">
    {plans.map((plan, index) => (
      <PlanCard key={index} plan={plan} />
    ))}
  </div>
)

export default CoursePlans
