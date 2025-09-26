import React, { Component, FC, useMemo } from 'react'
import { TNewsProps } from './types'
import { DictToListNotNull, getLocale } from '@/admin-react-app/ultilities/helper'
import { ActionPannel, CreateTableTemplate, CRUDPannel } from '@/modules/Library/Table'
import { INews } from '@/admin-react-app/model'
import { FormCreate } from './form.create'
import { FormEdit } from './form.edit'
import { FormDelete } from './form.delete'
import { Box, Switch, Typography } from '@mui/material'
import { getTranslation } from '@/locales/helper'
import { GetImageUrl } from '@/shared/helper'
import SwitchLazy from '../components/switch.lazy'
import { CreatePropsContext } from '../components/context.shared'
import { AttachWidget, createCellAttachWidget, IAttachItem } from '@/modules/LibraryLab/attach-widget'
import { TryParseArray } from '@/modules/Library/Helpers'
import { connect } from 'react-redux'
import { AttachmentMapRedux } from './redux.map-other'

export const language = getTranslation(getLocale())

export const PropsContext = CreatePropsContext<TNewsProps>()

export const TableInstance = CreateTableTemplate<INews>('Client', {
  getRowId: (x: INews) => x.Id,
  config: {
    Id: {
      headerName: 'Image',
      renderCell(params) {
        const row = params.row as INews
        return (
          <Box
            sx={{
              padding: '5px',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              border: '1px dotted #e0e0e0'
            }}
          >
            <img style={{ height: '100%' }} src={GetImageUrl('News', row.ImageUrl)} />
          </Box>
        )
      }
    },
    Name: {
      minWidth: 300,
      headerName: language.TableName
    },
    IsActive: {
      minWidth: 150,
      headerName: language.TableStatus,
      renderCell: (param) => {
        const isActive = param.value === true
        const row = param.row as INews
        return (
          <PropsContext.Consumer>
            {({ getProps }) => {
              const props = getProps()
              return (
                <SwitchLazy
                  defaultChecked={isActive}
                  onChange={async (value) => {
                    await props.UpdateFull({ Key: row.Key }, { IsActive: value })
                  }}
                />
              )
            }}
          </PropsContext.Consumer>
        )
      }
    },
    Tags: {
      minWidth: 150,
      headerName: language.TableTags
    },
    Description: {
      minWidth: 250,
      renderCell: ({ value, row }) => <AttachmentMapRedux row={row} value={value} />
    }
  }
})
