import React from "react";
import "./Friends.scss";
import Header from "../../components/atoms/Header";
import Footer from "../../components/atoms/Footer";
import Modal from "../../components/atoms/Modal";
import Dropdown from "../../components/atoms/Dropdown";
import { Show, ShowIfElse } from "../../components/atoms/ShowIf";
import useFirebase from "../../services/Firebase";
import useUserActions from "../../context/actions/UserActions";
import { ifElse, isEmpty } from "../../components/utils";
import toast from "../../components/atoms/Toaster";
import Section from "../../components/atoms/Section";
import { Option } from "../../components/utils/constants";

interface FriendsProps {}

const Friends: React.FC<FriendsProps> = () => {
	const modalDropdownOptions = ["Add", "Delete", "Requests"];
	const {
		getAllUsers,
		sendFriendRequest,
		getFriendRequests,
		getFriends,
		resolveFriendRequest,
		deleteFriend,
	} = useFirebase();
	const { userState } = useUserActions();
	const { allUsers, friends, friendRequests } = userState;

	const [showModal, setShowModal] = React.useState(false);
	const [manageType, setManageType] = React.useState("ADD");
	const [selectedNewUser, setSelectedNewUser] = React.useState("");

	const handleManageTypeChange = (value: string | Option) => {
		if (value === "REQUESTS") {
			getFriendRequests();
		}
		setManageType(value as string);
	};

	const callSendFriendRequest = () => {
		if (!isEmpty(selectedNewUser)) {
			sendFriendRequest(selectedNewUser, (err: any) => {
				if (err) {
					toast.error({ msg: "Failed", desc: err });
				} else {
					toast.success({ msg: "Friend request sent" });
					setSelectedNewUser("");
					setShowModal(false);
				}
			});
		}
	};

	React.useEffect(() => {
		getFriends();
	}, []);

	const handleFriendRequest = (accept: boolean = true, uid: string) => {
		resolveFriendRequest(uid, accept, (err: any) => {
			if (err) {
				toast.error({ msg: "Failed", desc: err });
			} else {
				getFriendRequests(true);
				getFriends(true);
				getAllUsers(true);
				toast.success({
					msg: `Friend request ${ifElse(accept, "accepted", "rejected")}`,
				});
			}
		});
	};

	const removeFriend = (targetUID: string) => {
		deleteFriend(targetUID, (err: any) => {
			if (err) {
				toast.error({ msg: "Failed", desc: err });
			} else {
				getFriends(true);
				getAllUsers(true);
				toast.success({ msg: "Friend removed" });
			}
		});
	};

	return (
		<>
			<Header />
			<div className='main-content friends'>
				<div className='heading'>
					<span>Friends ({friends.data.length})</span>
					<span
						onClick={() => {
							getAllUsers();
							setShowModal(true);
						}}>
						Manage
					</span>
				</div>
				<div className='content'>
					<ShowIfElse if={friends.data.length === 0}>
						<Section>
							<div>No Friends Found</div>
						</Section>
						<>
							{friends.data.map((friend) => (
								<Section>
									<div>{friend.name}</div>
								</Section>
							))}
						</>
					</ShowIfElse>
				</div>
			</div>
			<Footer />
			<Modal
				className='manage-friends-modal'
				open={showModal}
				handleClose={() => {
					setShowModal(false);
				}}>
				<div className='manage-heading'>
					<span>Manage Friends</span>
					<Dropdown
						className='manage-friend-dropdown'
						options={modalDropdownOptions.map((type) => ({
							label: type,
							value: type.toUpperCase(),
						}))}
						value={manageType}
						onSelect={handleManageTypeChange}
						showSearch={false}
						iconBefore={true}
					/>
				</div>
				<div className='manage-friend-content'>
					<Show if={manageType === "ADD"}>
						<div className='user-search'>
							<div>Select user to send the friend request</div>
							<Dropdown
								loading={allUsers.loading}
								className='user-search-fw'
								options={allUsers.data.map((user) => ({
									label: user.name,
									value: user.uid,
								}))}
								onSelect={(value) => {
									setSelectedNewUser(value as string);
								}}
								value={selectedNewUser}
							/>
							<button
								type='button'
								className='send-friend-request'
								onClick={() => {
									callSendFriendRequest();
								}}>
								Send Friend Request
							</button>
						</div>
					</Show>
					<Show if={manageType === "DELETE"}>
						<div className='user-content'>
							<ShowIfElse if={friends.data.length === 0}>
								<Section>
									<ShowIfElse if={friends.loading}>
										<div>Loading!!</div>
										<div>No Friends Found</div>
									</ShowIfElse>
								</Section>
								<>
									{friends.data.map((friend) => (
										<Section>
											<div>{friend.name}</div>
											<div className='actions'>
												<span
													onClick={() => {
														removeFriend(friend.uid);
													}}>
													Remove
												</span>
											</div>
										</Section>
									))}
								</>
							</ShowIfElse>
						</div>
					</Show>
					<Show if={manageType === "REQUESTS"}>
						<div className='user-content'>
							<ShowIfElse if={friendRequests.data.length === 0}>
								<Section>
									<ShowIfElse if={friendRequests.loading}>
										<div>Loading!!</div>
										<div>No Requests Found</div>
									</ShowIfElse>
								</Section>
								<>
									{friendRequests.data.map((friend) => (
										<Section>
											<div>{friend.name}</div>
											<div className='actions'>
												<span
													onClick={() => {
														handleFriendRequest(false, friend.uid);
													}}>
													NO
												</span>
												<span
													onClick={() => {
														handleFriendRequest(true, friend.uid);
													}}>
													OK
												</span>
											</div>
										</Section>
									))}
								</>
							</ShowIfElse>
						</div>
					</Show>
				</div>
			</Modal>
		</>
	);
};

export default Friends;
