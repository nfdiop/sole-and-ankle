import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Variant variant={variant}/>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Variant = ({ variant }) => {
  switch(variant){
    case "on-sale":
      return <SalePrice bgColor={COLORS.primary} textColor="white">Sale</SalePrice>
    case "new-release":
      return <SalePrice bgColor={COLORS.secondary} textColor="white">Just Released!</SalePrice>
    default:
      return <></>
  }
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  width: 30%;
  flex-grow: 1;
  min-width: 200px;
  max-width: 500px;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
    position: absolute;
    top: 0px;
    right: 0px;
    margin-top: 10px;
    margin-right: -10px;
    background: ${props => props.bgColor ?? "#FFFFFF"};
    padding: 4px 10px;
    color: ${props => props.textColor ?? "#000000"};
`;

export default ShoeCard;
