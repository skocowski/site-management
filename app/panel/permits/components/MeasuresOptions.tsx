'use client'
import {
    CheckIcon,
    Cross1Icon,
    UnderlineIcon,
} from "@radix-ui/react-icons"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

const MeasuresOptions = () => {
  return (
      <>
          <ToggleGroup type="single">
              <ToggleGroupItem value="yes" aria-label="Toggle bold">
                  <span className="h-4 w-4">Yes</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="no" aria-label="Toggle italic">
                  <span className="h-4 w-4">NO</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="na" aria-label="Toggle strikethrough">
                  <span className="h-4 w-4">N/A</span>
              </ToggleGroupItem>
          </ToggleGroup>
      
      </>
  )
}

export default MeasuresOptions