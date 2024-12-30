import React from "react";
import "./Groups.scss";
import Header from "../../components/atoms/Header";
import Footer from "../../components/atoms/Footer";
import Modal from "../../components/atoms/Modal";
import useFirebase from "../../services/Firebase";
import Input from "../../components/atoms/Input";
import Dropdown from "../../components/atoms/Dropdown";
import useUserActions from "../../context/actions/UserActions";
import toast from "../../components/atoms/Toaster";
import { isEmpty } from "../../components/utils";
import Section from "../../components/atoms/Section";

interface GroupsProps {}

const Groups: React.FC<GroupsProps> = () => {
	const { userState } = useUserActions();
	const { friends, groups } = userState;

	const [addGroupModal, setAddGroupModal] = React.useState(false);
	const [newGroupInfo, setNewGroupInfo] = React.useState<{
		title: string;
		users: Array<string>;
	}>({
		title: "",
		users: [""],
	});

	const { getMyGroups, addGroup, getFriends, deleteGroup } = useFirebase();

	React.useEffect(() => {
		getMyGroups();
	}, []);

	const createGroup = () => {
		if (
			isEmpty(newGroupInfo.title) ||
			newGroupInfo.users.some((id) => isEmpty(id))
		) {
			toast.error({ msg: "Please fill in all fields" });
			return;
		}
		addGroup(newGroupInfo, (err: any) => {
			if (err) {
				toast.error({ msg: "Failed to create group", desc: err });
			} else {
				toast.success({ msg: "Group created successfully" });
				setAddGroupModal(false);
				setNewGroupInfo({
					title: "",
					users: [""],
				});
				getMyGroups(true);
			}
		});
	};

	return (
		<>
			<Header />
			<div className='main-content groups'>
				<div className='heading'>
					<span>Groups</span>
					<span
						onClick={() => {
							getFriends();
							setAddGroupModal(true);
						}}>
						Add
					</span>
				</div>
				<div className='group-list'>
					{groups.data.map((group) => (
						<Section key={group.title}>
							<span>{group.title}</span>
							<span
								className='delete'
								onClick={() => {
									deleteGroup(group.id, (err: any) => {
										if (err) {
											toast.error({ msg: "Failed to delete group", desc: err });
										} else {
											toast.success({ msg: "Group deleted successfully" });
											getMyGroups(true);
										}
									});
								}}>
								Delete
							</span>
						</Section>
					))}
				</div>
			</div>
			<Footer />
			<Modal
				className='add-group-modal'
				open={addGroupModal}
				handleClose={() => {
					setAddGroupModal(false);
				}}>
				<div className='heading'>Add New Group</div>
				<div className='content'>
					<Input
						value={newGroupInfo.title}
						onChange={(value) => {
							setNewGroupInfo((prev) => ({
								...prev,
								title: value,
							}));
						}}
						placeholder='Group Name'
					/>
					<div className='friends'>
						<div className='sub-heading'>Add Friends to the group</div>
						<div className='list-friends'>
							{newGroupInfo.users.map((userID, index) => (
								<Dropdown
									key={`${userID}${index}`}
									options={friends.data.map((friend) => ({
										label: friend.name,
										value: friend.uid,
									}))}
									onlyOnValuePropChange
									onSelect={(value) => {
										if (newGroupInfo.users.includes(value as string)) {
											toast.error({ msg: "User already added" });
											return;
										}
										setNewGroupInfo((prev) => ({
											...prev,
											users: [
												...prev.users.slice(0, index),
												value as string,
												...prev.users.slice(index + 1),
											],
										}));
									}}
									value={userID}
								/>
							))}
						</div>
						<div
							className='add-text'
							onClick={() => {
								setNewGroupInfo((prev) => ({
									...prev,
									users: [...prev.users, ""],
								}));
							}}>
							Add a friend
						</div>
					</div>
					<button
						type='button'
						className='create-group'
						onClick={() => {
							createGroup();
						}}>
						Create
					</button>
				</div>
			</Modal>
		</>
	);
};

export default Groups;
