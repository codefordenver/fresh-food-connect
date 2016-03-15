import React from 'react'
import CoordinationTable from 'components/admin/CoordinationTable'
import DataTable from 'components/admin/DataTable'
import TestUtils, { Simulate, createRenderer } from 'react-addons-test-utils'
import { Checkbox } from 'material-ui'
import { expect } from 'chai'
import { shallowRender } from 'skin-deep'

describe('CoordinationTable', () => {
  it('renders donors into a DataTable component', () => {
    const tree = shallowRender(<CoordinationTable locations={[]} />)
    const result = tree.getRenderOutput()

    expect(result.type).to.eql(DataTable)
  })

  it('is configured to show headers on the DataTable', () => {
    const tree = shallowRender(<CoordinationTable locations={[]} />)
    const result = tree.getRenderOutput()

    expect(result.props.showHeaders).to.be.true
  })

  it('renders each row of the DataTable with pickup location attrs', () => {
    const donor = { id: 999, email: 'anthony@thoughtbot.com' },
          donation = { comments: 'Box is on the porch', location_id: 123 },
          location = {
            id: 123,
            address: '123 Someware Rd.',
            city: 'Denver',
            state: 'CO',
            zipcode: 80246,
            user_id: 999
          }

    const tree = shallowRender(
      <CoordinationTable
        donors={ [ donor ] }
        donations={ [ donation ] }
        locations={ [ location ] } />
    )
    const result = tree.getRenderOutput()
    const rowData = result.props.data[0]

    expect(rowData).to.contain({
      id: 123,
      address: '123 Someware Rd.',
      city: 'Denver',
      state: 'CO',
      zipcode: 80246,
      'contact email': 'anthony@thoughtbot.com',
      'donation comments': 'Box is on the porch'
    })
  })

  describe('when the donation size is 0 (not yet confirmed by donor)', () => {
    assertDonationSize(0, 'none')
    assertDonationConfirmed({ size: 0, confirmation: 'no'})
  })

  describe('when the donation size is 1', () => {
    assertDonationSize(1, 'small')
    assertDonationConfirmed({ size: 1 })
  })

  describe('when the donation size is 2', () => {
    assertDonationSize(2, 'medium')
    assertDonationConfirmed({ size: 2 })
  })

  describe('when the donation size is 3', () => {
    assertDonationSize(3, 'large')
    assertDonationConfirmed({ size: 3 })
  })

  describe('#getSelectedLocationIds', () => {
    it('returns ids for locations that have been selected', () => {
      const tree = shallowRender(<CoordinationTable locations={[]} />)
      const instance = tree.getMountedInstance()

      instance.state.locationsToEmail = {123: true}

      expect(instance.getSelectedLocationIds()).to.eql([123])
    })
  })

  describe('when donors are selected', () => {
    it('tracks checkbox-selected donor locations', () => {
      const location = { id: 123, user_id: 1 },
            donor = {id: 1},
            donation = {}

      const table = TestUtils.renderIntoDocument(
        <CoordinationTable
          donors={ [ donor ] }
          donations={ [ donation ] }
          locations={ [ location ] } />
      )
      const checkbox =
        TestUtils.findRenderedDOMComponentWithTag(table, 'input')

      Simulate.change(checkbox, { target: { checked: true } })

      expect(table.state.locationsToEmail).to.eql({ 123: true })
    })
  })

  function assertDonationSize(size, descriptor) {
    it(`describes a donation of size ${size} as "${descriptor}"`, () => {
      const donor = { id: 999 },
            donation = { location_id: 123, size: size },
            location = { id: 123, user_id: 999 }

      const tree = shallowRender(
        <CoordinationTable
          donors={ [ donor ] }
          donations={ [ donation ] }
          locations={ [ location ] } />
      )
      const result = tree.getRenderOutput()
      const rowData = result.props.data[0]

      expect(rowData['donation size']).to.equal(descriptor)
    })
  }

  function assertDonationConfirmed({ size, confirmation = 'yes' }) {
    it(`shows that the donation is confirmed when size is ${size}`, () => {
      const donor = { id: 999 },
            donation = { location_id: 123, size: size },
            location = { id: 123, user_id: 999 }

      const tree = shallowRender(
        <CoordinationTable
          donors={ [ donor ] }
          donations={ [ donation ] }
          locations={ [ location ] } />
      )
      const result = tree.getRenderOutput()
      const rowData = result.props.data[0]

      expect(rowData['donation confirmed?']).to.equal(confirmation)
    })
  }
})
