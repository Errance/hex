// Bilingual I Ching hexagram content
// This is knowledge base, not i18n translations

import type { HexagramContent } from './types';

export const hexagramContents: HexagramContent[] = [
  {
    id: 1,
    name: {
      en: "Qián (The Creative)",
      zh: "乾（创造）"
    },
    nameZh: "乾",
    namePinyin: "Qián",
    descriptionShort: {
      en: "The Creative principle. Pure yang energy, strength, and initiative.",
      zh: "创造之卦。纯阳之象，刚健有力，主动进取。"
    },
    judgement: {
      en: "The Creative works sublime success, furthering through perseverance.",
      zh: "元亨利贞。乾为天，刚健中正，纯粹精也。"
    },
    imageText: {
      en: "The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.",
      zh: "天行健，君子以自强不息。"
    },
    lines: [
      {
        index: 1,
        text: {
          en: "Hidden dragon. Do not act. The time is not yet right for action.",
          zh: "潜龙勿用。阳气潜藏，未可施为。"
        },
        original: "初九：潜龙勿用"
      },
      {
        index: 2,
        text: {
          en: "Dragon appearing in the field. It furthers one to see the great man.",
          zh: "见龙在田，利见大人。阳气显现，德施普也。"
        },
        original: "九二：见龙在田，利见大人"
      },
      {
        index: 3,
        text: {
          en: "The superior man is active all day. At nightfall his mind is still beset with cares.",
          zh: "君子终日乾乾，夕惕若，厉无咎。"
        },
        original: "九三：君子终日乾乾，夕惕若，厉无咎"
      },
      {
        index: 4,
        text: {
          en: "Wavering flight over the depths. No blame. One must remain flexible.",
          zh: "或跃在渊，无咎。进退无恒，非离群也。"
        },
        original: "九四：或跃在渊，无咎"
      },
      {
        index: 5,
        text: {
          en: "Flying dragon in the heavens. It furthers one to see the great man.",
          zh: "飞龙在天，利见大人。大人造也，与时偕行。"
        },
        original: "九五：飞龙在天，利见大人"
      },
      {
        index: 6,
        text: {
          en: "Arrogant dragon will have cause to repent. Pride goes before a fall.",
          zh: "亢龙有悔。盈不可久也，穷之灾也。"
        },
        original: "上九：亢龙有悔"
      }
    ],
    initialSummary: {
      general: {
        en: "A time of great creative potential and strength. The situation is highly favorable for new beginnings, but success requires persistence and correct timing. Like the heavens in constant motion, maintain your momentum and self-improvement.",
        zh: "此时充满创造潜力与力量。形势对新开始极为有利，但成功需要坚持和正确时机。如天行健，应保持前进动力，自强不息。"
      },
      tone: "very_favorable",
      scenes: {
        career: {
          en: "Strong leadership potential. Time to take initiative on important projects. Your creative ideas will be well-received, but maintain humility despite success.",
          zh: "展现强大的领导力。适合在重要项目上主动出击。你的创意将获认可，但即使成功也应保持谦逊。"
        },
        love: {
          en: "Passionate and dynamic period in relationships. Take the lead in expressing your feelings, but avoid being overly dominating. Mutual respect is key.",
          zh: "感情生活充满激情与活力。主动表达你的情感，但避免过于强势。相互尊重是关键。"
        },
        wealth: {
          en: "Excellent opportunities for financial growth. Your investments and business ventures have strong potential, but don't let success lead to arrogance.",
          zh: "财运亨通，增长机会极佳。投资和事业有强大潜力，但切勿因成功而傲慢。"
        }
      }
    }
  },
  {
    id: 2,
    name: {
      en: "Kūn (The Receptive)",
      zh: "坤（顺从）"
    },
    nameZh: "坤",
    namePinyin: "Kūn",
    descriptionShort: {
      en: "The Receptive principle. Pure yin energy, devotion, and yielding strength.",
      zh: "顺从之卦。纯阴之象，柔顺承载，厚德载物。"
    },
    judgement: {
      en: "The Receptive brings supreme success through the perseverance of a mare.",
      zh: "元亨，利牝马之贞。坤为地，柔顺利贞。"
    },
    imageText: {
      en: "The earth's condition is receptive devotion. Thus the superior man with breadth of character carries the outer world.",
      zh: "地势坤，君子以厚德载物。"
    },
    lines: [
      {
        index: 1,
        text: {
          en: "Treading on hoarfrost, solid ice is coming. Early warning signs should be heeded.",
          zh: "履霜，坚冰至。阴始凝也，驯致其道，至坚冰也。"
        },
        original: "初六：履霜，坚冰至"
      },
      {
        index: 2,
        text: {
          en: "Straight, square, great. Without purpose, yet nothing remains unfurthered.",
          zh: "直方大，不习无不利。地道光也，敬义立而德不孤。"
        },
        original: "六二：直方大，不习无不利"
      },
      {
        index: 3,
        text: {
          en: "Hidden lines. One is able to remain persevering. Following in service brings honor.",
          zh: "含章可贞。或从王事，无成有终。"
        },
        original: "六三：含章可贞，或从王事，无成有终"
      },
      {
        index: 4,
        text: {
          en: "A tied-up sack. No blame, no praise. Discretion in speech brings safety.",
          zh: "括囊。无咎无誉。慎不害也，天地闭也。"
        },
        original: "六四：括囊，无咎无誉"
      },
      {
        index: 5,
        text: {
          en: "A yellow lower garment brings supreme good fortune. Modesty and centeredness.",
          zh: "黄裳，元吉。文在中也，美之至也。"
        },
        original: "六五：黄裳，元吉"
      },
      {
        index: 6,
        text: {
          en: "Dragons fight in the meadow. Their blood is black and yellow.",
          zh: "龙战于野，其血玄黄。阴疑于阳必战，为其嫌于无阳也。"
        },
        original: "上六：龙战于野，其血玄黄"
      }
    ],
    initialSummary: {
      general: {
        en: "A time for receptivity, patience, and supportive action. Success comes through devotion and following the natural order. Like the earth supporting all things, your strength lies in steadiness and adaptability.",
        zh: "此时适合顺应、忍耐与支持性行动。成功源于虔诚和顺应自然规律。如大地承载万物，你的力量在于稳定与适应。"
      },
      tone: "favorable",
      scenes: {
        career: {
          en: "Support others and work cooperatively. This is not the time to push your own agenda, but to be a reliable team player. Your contributions will be recognized.",
          zh: "支持他人，团队合作。现在不是强推自己想法的时候，而应成为可靠的团队成员。你的贡献将被认可。"
        },
        love: {
          en: "Nurture and support your partner. Listen more than you speak. Your devotion and patience will strengthen the relationship.",
          zh: "关怀和支持伴侣。多倾听少说话。你的付出与耐心将巩固关系。"
        },
        wealth: {
          en: "Build a solid foundation rather than seeking quick gains. Conservative investments and steady accumulation are favored now.",
          zh: "打好坚实基础，而非追求快速获利。现在适合保守投资和稳步积累。"
        }
      }
    }
  },
  {
    id: 3,
    name: {
      en: "Zhūn (Difficulty at the Beginning)",
      zh: "屯（初始困难）"
    },
    nameZh: "屯",
    namePinyin: "Zhūn",
    descriptionShort: {
      en: "Difficulty at the beginning. Like a blade of grass pushing through hard earth.",
      zh: "初生困难。如草芽破土，虽难必成。"
    },
    judgement: {
      en: "Difficulty at the Beginning works supreme success, furthering through perseverance.",
      zh: "元亨利贞。勿用有攸往，利建侯。"
    },
    imageText: {
      en: "Clouds and thunder. The superior man brings order out of confusion.",
      zh: "云雷，屯。君子以经纶。"
    },
    lines: [
      {
        index: 1,
        text: {
          en: "Hesitation and hindrance. It furthers one to remain persevering. It furthers one to appoint helpers.",
          zh: "磐桓，利居贞，利建侯。虽磐桓，志行正也。"
        },
        original: "初九：磐桓，利居贞，利建侯"
      },
      {
        index: 2,
        text: {
          en: "Difficulties pile up. Horse and wagon part. If he is not a robber, he will woo at the right time.",
          zh: "屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。"
        },
        original: "六二：屯如邅如，乘马班如，匪寇婚媾"
      },
      {
        index: 3,
        text: {
          en: "Whoever hunts deer without the forester only loses his way in the forest.",
          zh: "即鹿无虞，惟入于林中，君子几不如舍，往吝。"
        },
        original: "六三：即鹿无虞，惟入于林中"
      },
      {
        index: 4,
        text: {
          en: "Horse and wagon part. Strive for union. To go brings good fortune. Everything acts to further.",
          zh: "乘马班如，求婚媾，往吉，无不利。"
        },
        original: "六四：乘马班如，求婚媾，往吉"
      },
      {
        index: 5,
        text: {
          en: "Difficulties in blessing. Perseverance brings good fortune. Going leads to misfortune.",
          zh: "屯其膏，小贞吉，大贞凶。"
        },
        original: "九五：屯其膏，小贞吉，大贞凶"
      },
      {
        index: 6,
        text: {
          en: "Horse and wagon part. Bloody tears flow. Extreme difficulty, but transformation is near.",
          zh: "乘马班如，泣血涟如。何可长也？"
        },
        original: "上六：乘马班如，泣血涟如"
      }
    ],
    initialSummary: {
      general: {
        en: "A period of initial difficulties and chaos, like a seedling breaking through hard soil. Progress is possible but requires patience and help from others. Don't act hastily; gather resources and support first.",
        zh: "初期困难混乱时期，如幼苗破土。进展可能但需要耐心和他人帮助。勿急于行动，先聚集资源与支持。"
      },
      tone: "challenging",
      scenes: {
        career: {
          en: "Starting something new brings unexpected obstacles. Don't push forward alone; seek mentors and build alliances. Patience now prevents bigger problems later.",
          zh: "新事业遇到意外阻碍。不要单打独斗，寻求导师并建立联盟。现在的耐心可避免日后更大麻烦。"
        },
        love: {
          en: "A new relationship or phase faces teething problems. Misunderstandings are likely. Take time to truly understand each other before making commitments.",
          zh: "新关系或新阶段面临磨合问题。容易产生误解。做出承诺前要花时间真正了解彼此。"
        },
        wealth: {
          en: "Financial ventures face initial setbacks. This is not the time for major investments. Focus on stabilizing your foundation first.",
          zh: "财务计划面临初期挫折。现在不适合重大投资。先专注于稳定基础。"
        }
      }
    }
  }
  // ... 其余61卦将逐步添加或通过迁移脚本生成
];

/**
 * Get hexagram by ID
 */
export function getHexagramById(id: number): HexagramContent | undefined {
  return hexagramContents.find(h => h.id === id);
}

/**
 * Get all hexagrams
 */
export function getAllHexagrams(): HexagramContent[] {
  return hexagramContents;
}

