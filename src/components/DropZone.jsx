import Dropzone from "react-dropzone";
import { Box, Button, Card, CardBody, Center, Text } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

export function DropZone({ file, setFile }) {
  return (
    <Card>
      <CardBody>
        <Dropzone multiple="false" onDropAccepted={(f) => setFile(f[0])}>
          {({ getRootProps, getInputProps }) => (
            <>
              <Box
                size="lg"
                borderWidth={file ? "2px" : "1px"}
                borderRadius="lg"
                borderColor={file ? "cyan" : "gray.200"}
                p={20}
                display="flex"
                flexDir="column"
                alignItems="center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Center>
                  <AttachmentIcon boxSize={10} />
                </Center>
                <Text p={4}>
                  Drag&amp;Drop file here, or click to select file
                </Text>
                <Button type="file">Select file</Button>
              </Box>
              <aside>{file.path}</aside>
            </>
          )}
        </Dropzone>
      </CardBody>
    </Card>
  );
}
