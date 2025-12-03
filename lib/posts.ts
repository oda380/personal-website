import { Post } from './types';

export const posts: Post[] = [
    {
        title: 'Building Web3 Loyalty Systems',
        slug: 'web3-loyalty-systems',
        status: 'planned',
        oneLiner: 'Understanding lifetime, active, and spendable points in tokenized loyalty programs',
        tags: ['web3', 'loyalty', 'product'],
        lastUpdated: '2025-12-03',
        keyIdea: 'Breaking down the three-tier point system that makes Web3 loyalty work: lifetime tracking for status, active points for current balance, and spendable points for redemption mechanics.',
    },
    {
        title: 'Explaining Web3 to Non-Crypto Teams',
        slug: 'explaining-web3',
        status: 'planned',
        oneLiner: 'How to bridge product, engineering, payments, and marketing when introducing Web3',
        tags: ['web3', 'communication', 'product'],
        lastUpdated: '2025-12-03',
        keyIdea: 'Each team has different concerns: engineering wants technical clarity, payments needs compliance assurance, marketing wants storytelling tools. Here\'s how to speak all their languages.',
    },
    {
        title: 'Tracing On-Chain Risk Without Losing Context',
        slug: 'on-chain-risk',
        status: 'planned',
        oneLiner: 'Combining Chainalysis Reactor with internal data for comprehensive risk assessment',
        tags: ['risk', 'on-chain', 'ops'],
        lastUpdated: '2025-12-03',
        keyIdea: 'On-chain tools show wallet relationships, but you need internal context (user behavior, transaction patterns, support tickets) to make real decisions. Here\'s how to combine them effectively.',
    },
];
