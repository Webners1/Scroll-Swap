import { useTranslation } from '@pancakeswap/localization'
import { Button, Checkbox, Flex, Grid, Modal, ModalV2, Text } from '@pancakeswap/uikit'
import { useState } from 'react'

const TermsModal = () => {
  const { t } = useTranslation()
  const [terms, setTerms] = useState(localStorage?.getItem('terms'))
  const [open, setOpen] = useState(true)

  const onClick = () => {
    localStorage?.setItem('terms', 'true')
    setTerms('true')
    setOpen(false)
  }

  return (
    <ModalV2 isOpen={open} closeOnOverlayClick={false} onDismiss={() => setOpen(false)}>
      <Modal title={t(`Accept Terms`)} hideCloseButton headerBackground="gradientCardHeader" minHeight="none">
        <Grid style={{ gap: '16px' }} maxWidth="560px">
          <Text color="white">
            This website (the &quot;Interfac=&quot;), serves as the frontend interface for LolPad, a decentralised
            protocol comprising a collection of smart contracts and tools (the=&quot;LolPad Financ=&quot;). The
            Interface, along with LolPad Finance, is provided=&quot;as i=&quot; by the LolPad team. The LolPad team
            makes no warranties, either express or implied, regarding the Interface or LolPad Finance, including but not
            limited to any warranties of merchantability or fitness for a particular purpose. All transactions involving
            the protocol are carried out exclusively on permissionless networks not controlled by the LolPad team.
            <br />
            <br />
            The Interface is not made available to users in jurisdictions where its use would be illegal or otherwise
            prohibited. This includes but is not limited to regions such as the United States of America, North Korea,
            Iran, and other countries subject to international sanctions. By using the Interface, you agree that you are
            not a resident of any such region. You also agree that you are not on any list of persons or entities
            subject to sanctions issued by the United Nations, the European Union, or any other relevant authority.
            <br />
            <br />
            Furthermore, by using LolPad Finance, you agree to comply with all applicable laws, regulations, and
            guidelines, including but not limited to those related to financial transactions, privacy, and data
            protection. You acknowledge and understand that LolPad Finance is a decentralised protocol, and as such, the
            LolPad team does not have control over individual user actions or transactions. You agree to use LolPad
            Finance responsibly and lawfully, and you will not engage in any illegal activities or use LolPad Finance
            for any unlawful purposes.
            <br />
            <br />
            You also acknowledge that while LolPad Finance strives to provide a secure and reliable platform, there are
            inherent risks associated with decentralised finance (DeFi) protocols, including but not limited to smart
            contract vulnerabilities, hacking, and unforeseen technical issues. You agree to use LolPad Finance at your
            own risk and understand that the LolPad team cannot be held liable for any losses or damages resulting from
            your use of LolPad Finance.
            <br />
            <br />
            In the event of any dispute or legal action arising from your use of LolPad Finance, you agree to indemnify
            and hold harmless the LolPad team, its affiliates, employees, agents, and partners from any claims, losses,
            damages, liabilities, costs, and expenses (including legal fees) arising from or related to your use of
            LolPad Finance or any breach of these terms.
          </Text>
          <Flex justifyContent="flex-start" alignItems="center">
            <Checkbox
              id="toggle-disable-multihop-button"
              checked={terms === 'true'}
              scale="sm"
              onChange={() => {
                if (terms === 'true') {
                  setTerms('false')
                } else {
                  setTerms('true')
                }
              }}
            />
            <Text color="white" ml={10}>
              I have read and accept the terms
            </Text>
          </Flex>
          <Button disabled={terms !== 'true'} onClick={onClick}>
            Confirm
          </Button>
        </Grid>
      </Modal>
    </ModalV2>
  )
}

export default TermsModal
