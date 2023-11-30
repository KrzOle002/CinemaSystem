import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const News = () => {
	const [posts, setPosts] = useState<string[]>([])
	const [newPost, setNewPost] = useState<string>('')
	const [isDialogOpen, setDialogOpen] = useState(false)

	const handlePostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewPost(e.target.value)
	}

	const handleAddPost = () => {
		if (newPost.trim() !== '') {
			setPosts([...posts, newPost])
			setNewPost('')
			setDialogOpen(false)
		}
	}

	return (
		<Container>
			<h1>Aktualności</h1>
			<NewsContainer>
				{posts.map((post, index) => (
					<Post key={index}>{post}</Post>
				))}
			</NewsContainer>
			<AddPostButton onClick={() => setDialogOpen(true)}>Dodaj Post</AddPostButton>
			{isDialogOpen && (
				<Dialog>
					<h2>Dodaj Nowy Post</h2>
					<textarea placeholder='Wpisz treść posta' value={newPost} onChange={handlePostChange}></textarea>
					<ButtonContainer>
						<CancelButton onClick={() => setDialogOpen(false)}>Anuluj</CancelButton>
						<AddButton onClick={handleAddPost}>Dodaj</AddButton>
					</ButtonContainer>
				</Dialog>
			)}
		</Container>
	)
}

export default News

const Container = styled.div`
	width: 60%;
	margin: 0 auto;
	color: #333;

	h1 {
		font-family: 'Saira', sans-serif;
		text-align: center;
		padding: 20px 0;
	}
`

const NewsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Post = styled.div`
	background-color: #f5f5f5;
	border: 1px solid #ddd;
	padding: 10px;
	margin-bottom: 10px;
	max-width: 400px;
	word-wrap: break-word;
`

const AddPostButton = styled.button`
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
`

const Dialog = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`

const CancelButton = styled.button`
	background-color: #ccc;
	color: #333;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
`

const AddButton = styled.button`
	background-color: #28a745;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 14px;
`
