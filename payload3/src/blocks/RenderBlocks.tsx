import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DealsOfTheWeekBlock } from '@/blocks/DealsOfTheWeek/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HomeMarketSectionBlock } from '@/blocks/HomeMarketSection/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroCarouselBlock } from '@/blocks/ProductHeroCarousel/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { TrendingPicksBlock } from '@/blocks/TrendingPicks/Component'
import { WhyChooseSectionBlock } from '@/blocks/WhyChooseSection/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type { Page } from '../payload-types'

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  dealsOfTheWeek: DealsOfTheWeekBlock,
  formBlock: FormBlock,
  heroCarousel: HeroCarouselBlock,
  homeMarketSection: HomeMarketSectionBlock,
  mediaBlock: MediaBlock,
  threeItemGrid: ThreeItemGridBlock,
  trendingPicks: TrendingPicksBlock,
  whyChooseSection: WhyChooseSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
