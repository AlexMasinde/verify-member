import { Container } from "@chakra-ui/react";

export default function TextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      padding="8px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
      marginBottom="10px"
      centerContent
      w="100%"
    >
      {children}
    </Container>
  );
}
