import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";


export default function About() {
	return (
		<Box padding='6' boxShadow='lg' bg='white'>
			<h1>Le vostre stronzate qui</h1>
			<SkeletonCircle size='10' />
			<SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
		</Box>
	);
}
