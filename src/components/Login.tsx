import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";
import { googleAuthProvider, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	// signOut,
} from "firebase/auth";
import { CircularProgress } from "@mui/material";

interface IProps {
	children: JSX.Element;
}

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn({ children }: IProps): JSX.Element {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [user, loading, error] = useAuthState(auth);

	const signIn = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
		}
	};
	const googleSignIn = async () => {
		try {
			await signInWithPopup(auth, googleAuthProvider);
		} catch (err) {
			console.error(err);
		}
	};
	// const logout = async () => {
	// 	try {
	// 		await signOut(auth);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	return (
		<>
			{loading ? (
				<Container
					sx={{
						marginTop: 20,
						alignContent: "center",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box sx={{ display: "flex" }}>
						<CircularProgress />
					</Box>
				</Container>
			) : (
				<>
					{!user ? (
						<ThemeProvider theme={defaultTheme}>
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<Box
									sx={{
										marginTop: 8,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Avatar
										sx={{ m: 1, bgcolor: "secondary.main" }}
									>
										<LockOutlinedIcon />
									</Avatar>
									<Typography component="h1" variant="h5">
										Sign in
									</Typography>
									<Box
										component="form"
										onSubmit={signIn}
										noValidate
										sx={{ mt: 1 }}
									>
										<TextField
											value={email}
											type="email"
											onChange={(e) =>
												setEmail(e.target.value)
											}
											placeholder="Email"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
											autoFocus
										/>
										<TextField
											value={password}
											type="password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											placeholder="Password"
											margin="normal"
											required
											fullWidth
											name="password"
											label="Password"
											id="password"
											autoComplete="current-password"
										/>

										<Button
											type="submit"
											fullWidth
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
										>
											Sign In/Sign Up
										</Button>
									</Box>
									<Button
										onClick={googleSignIn}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										SignIn/Signup With Google
									</Button>
								</Box>
								<Copyright sx={{ mt: 8, mb: 4 }} />
							</Container>
						</ThemeProvider>
					) : (
						children
					)}
				</>
			)}
		</>
	);
}
