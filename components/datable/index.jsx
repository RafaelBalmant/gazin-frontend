import {
  Container,
  FooterTable,
  HeaderButton,
  HeaderContainer,
  IconContainer,
  ItemItensPerPageContainer,
  ArrowsContainer,
} from './styles'
import LevelsTable from './typeTable/levelsTable'
import DevelopersTable from './typeTable/developersTable'
import { usePageState } from '../../context/pageState'
import { mdiPlusBox } from '@mdi/js'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import { Button, MenuItem, Select } from '@mui/material'
import { mdiArrowRight } from '@mdi/js'
import { useState } from 'react'

export default function Datable(props) {
  const { pageState, setPageState } = usePageState()

  return (
    <Container>
      <HeaderContainer>
        <div>
          <HeaderButton
            pageState={pageState.currentPage === 'dev'}
            onClick={() =>
              setPageState({
                ...pageState,
                currentPage: 'dev',
                reqInfo: {
                  limit: 10,
                  page: 1,
                },
              })
            }
          >
            DESENVOLVEDORES
          </HeaderButton>
          <HeaderButton
            pageState={pageState.currentPage === 'level'}
            onClick={() =>
              setPageState({
                ...pageState,
                currentPage: 'level',
                reqInfo: {
                  limit: 10,
                  page: 1,
                },
              })
            }
          >
            NIVEIS
          </HeaderButton>
        </div>
        <IconContainer
          onClick={() =>
            setPageState({
              ...pageState,
              dialog: {
                open: true,
                data: {},
                type: pageState.currentPage,
              },
            })
          }
        >
          <Icon path={mdiPlusBox} title="bin" size={1} className="binIcon" />
        </IconContainer>
      </HeaderContainer>
      <DevelopersTable />
      <LevelsTable />
      <FooterTable>
        <ItemItensPerPageContainer>
          <Select
            className="select-itens-per-page"
            value={pageState.reqInfo.limit}
            onChange={(event) => {
              setPageState({
                ...pageState,
                reqInfo: {
                  limit: event.target.value,
                  page: pageState.reqInfo.page,
                },
              })
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem
              value={20}
              disabled={pageState.apiRes.data?.length < pageState.reqInfo.limit}
            >
              20
            </MenuItem>
          </Select>
        </ItemItensPerPageContainer>
        <ArrowsContainer>
          <Button
            className="button-arrow"
            disabled={pageState.reqInfo.page == 1}
          >
            <Icon
              path={mdiArrowLeft}
              title="bin"
              size={1}
              onClick={() =>
                setPageState({
                  ...pageState,
                  reqInfo: {
                    limit: pageState.reqInfo.limit,
                    page: pageState.reqInfo.page - 1,
                  },
                })
              }
            />
          </Button>
          <Button
            className="button-arrow"
            disabled={pageState.reqInfo.limit > pageState.apiRes.data?.length}
          >
            <Icon
              path={mdiArrowRight}
              title="mdiArrowRight"
              size={1}
              onClick={() => {
                setPageState({
                  ...pageState,
                  reqInfo: {
                    limit: pageState.reqInfo.limit,
                    page: pageState.reqInfo.page + 1,
                  },
                })
              }}
            />
          </Button>
        </ArrowsContainer>
      </FooterTable>
    </Container>
  )
}
