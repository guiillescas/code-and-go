import { ReactElement, useEffect, useState } from 'react'

import { FiEdit2 } from 'react-icons/fi'

import CreateUsersModal from './components/CreateUserModal'
import EditUsersModal from './components/EditUserModal'
import { AdminUserProps } from './components/EditUserModal/types'
import Button from 'components/Button'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import AdminLayout from 'layouts/AdminLayout'

import * as Styles from './styles'

export default function AdminUsers(): ReactElement {
  const { token } = useAuth()

  const [users, setUsers] = useState<AdminUserProps[]>([])

  const [selectedUser, setSelectedUser] = useState<AdminUserProps | null>(null)

  const [isCreateUsersModalOpen, setIsCreateUsersModalOpen] = useState(false)
  const [isEditUsersModalOpen, setIsEditUsersModalOpen] = useState(false)

  useEffect(() => {
    api(token)
      .get('/user/admin/list?page=1&pagesize=10')
      .then((response) => {
        setUsers(response.data.data)
      })
  }, [token])

  function handleEditUser(user: AdminUserProps) {
    api(token).post('')
  }

  console.log(users)

  return (
    <AdminLayout>
      <Styles.AdminUsersContainer>
        <div className="header">
          <h1>Usuários da plataforma</h1>

          <Button onClick={() => setIsCreateUsersModalOpen(true)}>
            Criar usuário
          </Button>
        </div>

        <table className="courses">
          <tr>
            <th></th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>

          {users.map((user, index) => (
            <tr key={user.id} className="user">
              <td>{index + 1}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="actions">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(user)
                    setIsEditUsersModalOpen(true)
                  }}
                  title="Editar"
                >
                  <FiEdit2 />
                </button>
              </td>
            </tr>
          ))}
        </table>

        <CreateUsersModal
          isOpen={isCreateUsersModalOpen}
          onRequestClose={() => setIsCreateUsersModalOpen(false)}
          setUsers={setUsers}
        />

        <EditUsersModal
          isOpen={isEditUsersModalOpen}
          onRequestClose={() => {
            setSelectedUser(null)
            setIsEditUsersModalOpen(false)
          }}
          user={selectedUser}
          setUsers={setUsers}
          handleEditUser={handleEditUser}
        />
      </Styles.AdminUsersContainer>
    </AdminLayout>
  )
}
