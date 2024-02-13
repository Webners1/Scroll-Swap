import {
  ArrowBackIcon,
  AtomBox,
  AutoRow,
  Box,
  Button,
  Flex,
  IconButton,
  NotificationDot,
  Text,
} from '@pancakeswap/uikit'
import { useExpertMode } from '@pancakeswap/utils/user'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, styled } from 'styled-components'
import { StyledTabWrapper } from 'views/Swap/V3Swap/styles'
import { StyledFormButtons } from 'views/Swap/components/styleds'
import { SettingsMode } from '../Menu/GlobalSettings/types'

interface Props {
  title?: string | React.ReactNode
  subtitle?: string
  helper?: string
  backTo?: string | (() => void)
  noConfig?: boolean
  IconSlot?: React.ReactNode
  buttons?: React.ReactNode
  filter?: React.ReactNode
  shouldCenter?: boolean
  borderHidden?: boolean
  hideTabs?: boolean
}

const AppHeaderContainer = styled(Flex)<{ borderHidden?: boolean }>`
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  width: 100%;

  ${({ borderHidden }) =>
    borderHidden &&
    css`
      border-bottom: 1px solid transparent;
    `}
`

const FilterSection = styled(AutoRow)`
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`
const IconWrap = styled.div`
  button {
    margin-left: 0px;
    margin-right: 0px;
    background-color: #504f54;
  }
`
const RightIconWrap = styled.div`
  button {
    background-color: #504f54;
  }
`

const AppHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  helper,
  backTo,
  noConfig = false,
  IconSlot = null,
  buttons,
  filter,
  shouldCenter = false,
  borderHidden = false,
  hideTabs = false,
}) => {
  const [expertMode] = useExpertMode()
  // ---- TABS -- -- //
  const router = useRouter()
  const activeTab = router.pathname

  return (
    <AppHeaderContainer borderHidden={borderHidden}>
      <Flex alignItems="center" width="100%" style={{ gap: '16px' }}>
        {backTo &&
          (typeof backTo === 'string' ? (
            <Link legacyBehavior passHref href={backTo}>
              <IconButton as="a" scale="sm">
                <ArrowBackIcon width="32px" />
              </IconButton>
            </Link>
          ) : (
            <IconButton scale="sm" variant="text" onClick={backTo}>
              <ArrowBackIcon width="32px" />
            </IconButton>
          ))}
        <Flex pr={backTo && shouldCenter ? '48px' : ''} flexDirection="column" width="100%">
          <AtomBox
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: '20px', md: '0px' }}
            flexDirection={{ xs: 'column', md: 'row' }}
            mb="8px"
          >
            {/* <Flex flex={1} justifyContent={shouldCenter ? 'center' : ''}>
              {typeof title === 'string' ? <Heading as="h2">{title}</Heading> : title}
              {helper && <QuestionHelper text={helper} ml="4px" placement="top" />}
            </Flex> */}
            {!hideTabs ? (
              <StyledTabWrapper>
                <Link href="/swap">
                  <Button className={activeTab === '/swap' ? 'active' : ''}>Swap</Button>
                </Link>
                <Link href="/liquidity">
                  <Button className={activeTab === '/liquidity' ? 'active' : ''}>Liquidity</Button>
                </Link>
              </StyledTabWrapper>
            ) : (
              <Box> </Box>
            )}
            <StyledFormButtons>
              {!noConfig && (
                <Flex alignItems="flex-end" flexDirection={hideTabs ? 'row-reverse' : 'row'}>
                  <IconWrap>
                    <NotificationDot show={expertMode}>
                      <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
                    </NotificationDot>
                  </IconWrap>
                  <RightIconWrap>{IconSlot}</RightIconWrap>
                </Flex>
              )}
              {noConfig && buttons && (
                <Flex alignItems="center" mr="16px">
                  {buttons}
                </Flex>
              )}
              {noConfig && IconSlot && <Flex alignItems="center">{IconSlot}</Flex>}
            </StyledFormButtons>
          </AtomBox>
          {subtitle && (
            <Flex alignItems="center" justifyContent={shouldCenter ? 'center' : ''}>
              <Text textAlign={shouldCenter ? 'center' : 'inherit'} color="textSubtle" fontSize="14px">
                {subtitle}
              </Text>
            </Flex>
          )}
          {filter && (
            <FilterSection justifyContent="space-between" gap="8px">
              {filter}
            </FilterSection>
          )}
        </Flex>
      </Flex>
    </AppHeaderContainer>
  )
}

export default AppHeader
