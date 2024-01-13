import { Permit } from "@/app/utils/types"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ReviewPermit = ({permitId} : {permitId: string}) => {
    return (
      

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Review Permit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review work permit</DialogTitle>
          <DialogDescription>
         Please review the permit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
              <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Approved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Rejected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">In progress</Label>
                  </div>
              </RadioGroup>
                    
                                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" placeholder="Your comment" />
              </div>
        </div>
        <DialogFooter>
          <Button type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>




  )
}

export default ReviewPermit



