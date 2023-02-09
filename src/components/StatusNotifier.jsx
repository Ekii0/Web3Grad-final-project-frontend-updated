import { useToast } from "@chakra-ui/react";

export function StatusNotifier({ props }) {
  const toast = useToast();
  return toast({
    title: props.header,
    description: props.description,
    status: props.status,
    position: "top-right",
    duration: 9000,
    isClosable: true,
  });
}
