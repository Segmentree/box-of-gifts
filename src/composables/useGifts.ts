import { computed } from 'vue'

export interface Gift {
  name: string
  description: string
}

const gifts: Gift[] = [
  {
    name: '💖 Spa Day',
    description: 'A full day of peace and pampering together — warm baths, soft robes, and pure relaxation.'
  },
  {
    name: '😍 Sexy Surprise',
    description: 'A playful, intimate moment planned just for the two of us — fun, flirty, and full of smiles.'
  },
  {
    name: '🍰 Happy Restaurant Date',
    description: 'A delicious dinner in a cozy place, laughing, talking, and enjoying every bite together.'
  },
  {
    name: '😘 Kiss Coupon',
    description: 'Redeemable anytime for a long, sweet kiss that instantly makes everything better.'
  },
  {
    name: '💌 Love Letter',
    description: 'A heartfelt letter written just for you, filled with love and admiration.'
  },
  {
    name: '💞 Relaxing Massage',
    description: 'A gentle, warm massage from me to you, meant to melt away stress and make you feel adored.'
  },
  {
    name: '🏡 Cozy House in the Woods',
    description: 'A peaceful escape into nature, just you and me, surrounded by trees, warmth, and quiet moments.'
  },
  {
    name: '🛠️ Fence Finishing Day',
    description: 'A productive day where we team up, finish a project, and feel proud together.'
  },
  {
    name: '🌼 Sunny Picnic',
    description: 'A blanket, good food, sunshine, and that perfect moment when we lie down and watch the sky.'
  },
  {
    name: '🎠 Efteling Trip',
    description: 'A magical day full of rides, surprises, fairy-tale vibes, and childhood joy.'
  },
  {
    name: '👨‍🍳 Husband\'s Special Dinner',
    description: 'A homemade meal prepared entirely by me — your favorite dishes, made with love.'
  },
  {
    name: '🌈 Fun Day Out',
    description: 'A spontaneous adventure — fresh air, laughs, wandering around with no plan at all.'
  },
  {
    name: '🧭 Little Adventure (Lost for 3 Days)',
    description: 'A playful "disappear together" escape from routine, just us exploring and forgetting the world.'
  },
  {
    name: '🤗 Big Warm Hug',
    description: 'A long, tight, cozy hug that solves everything and fills your whole body with warmth.'
  },
  {
    name: '🌊 Pool Day',
    description: 'Splashing, tanning, relaxing in the water, and enjoying a slow, sunny day together.'
  },
  {
    name: '🌜 Nighttime Snuggles',
    description: 'A whole night of cuddling, spooning, and soft whispers before falling asleep.'
  },
  {
    name: '🍹 Cheerful Drinks',
    description: 'A night out with cocktails, laughter, music, and the kind of vibe that makes everything fun.'
  },
  {
    name: '🎁 Big Soft Plush',
    description: 'A surprise giant plush toy chosen especially for you — soft, cute, and perfect for cuddles.'
  }
]

const letter = `
No es suficiente con decirlo, ni con intentar demostrarlo con gestos, ni mucho menos con pensarlo. Hay cosas que solo basta sentirlas con todas tus fuerzas. Y siento que ya te debo miles, millones de esas… de las que valen la pena, de las que te hacen enorgullecerte y volar un ratico, de esas que te detienes a sentir y te regocijas. De esas vengo a darte hoy un puñadito, aunque sea chiquito, porque sé que te las mereces. Porque ya te ganaste ver —aunque sea por una rendijita— lo que tú eres para mí.

Y no es solo ese calorcito tan rico de estar acurrucado contigo, siguiéndote la silueta con un dedo, descubriéndote sin cansarme y con el mismo fervor de la primera vez.
No entiendo cómo puede seguir creciendo esta adicción, si ya lo era todo. Ahora es siempre. Es cuando me miras y te sonríes poquito, casi nada, y aun así me embriaga y no quiero dejar de mirarte. O cuando estás ñoñita y solo quieres estar cerquita, hecha un ovillito. Pero incluso eso se queda corto.

Es la confianza eterna. La devoción más grande. Ya no eres solo mi amiga ni mi pareja: te veo como mi diosa, a la que le voy debiendo pedacitos de mi alma; y no puedo más que reír al saber que tú los tienes.
Besarte es cada vez una droga más fuerte. Ahora entiendo cuando me lo decías. Ahora entiendo por qué curaba, por qué abrazaba. Eres la que me explica el mundo, la que me lo ordena. Y ya ves, me hiciste ver que a veces solo hacía falta cambiar el lente.

Y cómo te explico que ahora, cuando llegan esos recuerdos que te hacen sonreír, los que te dan ganas de volver, de sentir, de ser feliz… en todos esos, ahora, estás tú. ¿Y qué hago con eso? Si eres mi luz, mi estrellita, mi razón. Y sí, tengo miedo. No solo el razonable miedo de quien ama y teme perder, sino ese miedo terrible: el de un día voltearme y ver que no encontré tu sonrisa.

No sé si sabes cuánto disfruto el gustarte por hacer cositas. No solo por el pequeño “trick” que me das después, sino porque siento cómo te pones un poquito contenta, y cómo no puedes evitar que se te escape esa sonrisita diminuta que—creo—voy a empezar a besar siempre. Porque ahí es donde se te ponen los ojitos grandes, brillosos, con ese tin llorosito que a mí me manda la señal perfecta. Luego te miro y se me sale un “te amo”. Tímido a veces, pero inevitable. Necesario. Justo ahí. Te amo.

Y es que… ¿cuándo no lo es?

Ven. Déjame hablarte bajito al oído, mi diosa, mi dragona morena, mi gordita linda: tú me haces feliz. Estás aquí, justo al centro del pecho, un poquito a la izquierda. Enredaste mis sienes, y ahora te puedo ver en todas partes donde has dejado un pedacito de tu alma.

¿Para qué luchar como antes? Ya lo tengo claro. Ya no necesito un barco para aventurarme al mundo buscando cicatrices que me recuerden que viví y me hagan sentir orgulloso. ¿Para qué, si para volar tengo tus ojos, para saber de tu presencia, para aventurarme un beso y para soñar tu cintura? Ya tengo por quién matar, ya tengo por quién morir, ya tengo por quién vivir… y ya tengo a quién amar.

¿Puede alguien dudar que por ti no fui capaz de convertirme en poeta? Quizás. Pero no pueden negar que cada palabra fue lágrima, que cada verso fue alegría, que hubo corazón en cada frase y un recuerdo en cada punto. Que me abrí y miré adentro para entregártelo vivo, y que hubo una pausa en cada línea para soltar un suspiro. No sabré si es poesía, pero sí sé que me metí dentro buscando si te encontraba… y al final, sí: eras tú la poesía.

Y así entendí que contigo no debo buscar más. Es hora de celar, de proteger, de abrazar. Es hora de disfrutar, porque siempre existe el día en que toca pagar toda la felicidad debida. Por eso, gordita mía, te amaré hasta después de eso, para después recordar —en la eternidad del espacio— cómo fue aquel instante que iluminó mi universo. Ese que tuve sin merecérmelo, aquel día hace seis años, cuando gracias a otro dios tú me correspondiste un beso.

`

export function useGifts() {
  const allGifts = computed(() => gifts)
  const giftNames = computed(() => gifts.map(g => g.name))
  
  const getGiftByIndex = (index: number): Gift | undefined => {
    return gifts[index]
  }
  
  const getGiftByName = (name: string): Gift | undefined => {
    return gifts.find(g => g.name === name)
  }
  
  return {
    allGifts,
    giftNames,
    letter,
    getGiftByIndex,
    getGiftByName
  }
}
