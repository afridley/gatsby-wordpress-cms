import React from 'react'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class PageMeta extends React.Component {
  render() {
    const { date } = this.props
    return (
      <div
        className="page__meta"
        css={{
          fontFamily: fonts.monospace,
          fontSize: '0.8em',
          textTransform: 'uppercase',
          [presets.mdUp]: {
            gridColumn: '3 / span 2',
            gridRow: '2 / 3',
            '&::after': {
              content: '""',
              display: 'block',
              width: '40px',
              height: '3px',
              marginTop: '10px',
              backgroundColor: '#000',
            },
            '& span': {
              display: 'block',
            },
          },
          [presets.lgUp]: {
            gridColumn: '3 / 4',
          },
        }}
      >
        {date ? (
          <span
            className="page__date"
            css={{
              [presets.mdDown]: {
                '&::before': {
                  content: `' · '`,
                },
              },
            }}
          >
            {date}
          </span>
        ) : (
          <span />
        )}
      </div>
    )
  }
}

export default PageMeta
