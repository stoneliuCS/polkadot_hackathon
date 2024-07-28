import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react"

const defaultContent =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


const components = [
  <Button color="primary">Button</Button>,
  <Card>
    <CardBody>
      <p>Card Content</p>
    </CardBody>
  </Card>,
  // <Button color="secondary">Button</Button>,
  // <Button color="danger">Button</Button>,
  // <Button color="success">Button</Button>,
]

// Utility function to get 3 random components
const getRandomComponents = () => {
  const shuffled = components.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
}

export default function GuessGame() {
  return (
    <div>
      {getRandomComponents().map((component) => {
        return <div> {component} </div>
      })}
    </div>
  )
}
