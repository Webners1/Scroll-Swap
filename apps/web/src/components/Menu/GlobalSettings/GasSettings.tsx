import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, QuestionHelper, Text } from '@pancakeswap/uikit'
import { GAS_PRICE, GAS_PRICE_GWEI } from 'state/types'
import { useGasPriceManager } from 'state/user/hooks'

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="12px" alignItems="center">
        <Text color="#fff">{t('Default Transaction Speed (GWEI)')}</Text>
        <QuestionHelper
          color="#FFF"
          text={
            <Flex flexDirection="column">
              <Text color="#fff">
                {t(
                  'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees.',
                )}
              </Text>
              <Text color="#fff" mt="8px">
                {t('Choose “Default” to use the settings from your current blockchain RPC node.')}
              </Text>
            </Flex>
          }
          placement="top"
          ml="4px"
        />
      </Flex>
      <Flex flexWrap="wrap">
        <Button
          mt="4px"
          mr="4px"
          p="24px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.rpcDefault)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.rpcDefault ? 'primary' : 'tertiary'}
        >
          {t('Default')}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          p="24px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
        >
          {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          p="24px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
        >
          {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}
        </Button>
        <Button
          mr="4px"
          mt="4px"
          p="24px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GasSettings
