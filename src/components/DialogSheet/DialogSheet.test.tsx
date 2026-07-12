import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Button } from '../Button/Button'
import { DialogSheet } from './DialogSheet'

describe('DialogSheet', () => {
  it('opens with an accessible title and closes from the close button', async () => {
    const user = userEvent.setup()
    render(
      <DialogSheet title="Add UI review" trigger={<Button>Add review</Button>}>
        Review form
      </DialogSheet>,
    )

    await user.click(screen.getByRole('button', { name: 'Add review' }))
    expect(screen.getByRole('dialog', { name: 'Add UI review' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: '닫기' }))
    expect(screen.queryByRole('dialog', { name: 'Add UI review' })).not.toBeInTheDocument()
  })
})
