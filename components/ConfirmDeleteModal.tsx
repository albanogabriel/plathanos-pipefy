// components/ConfirmDeleteModal.tsx
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ConfirmModalProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
}

export function ConfirmDeleteModal({
  visible,
  onConfirm,
  onCancel,
  title = 'Confirmar',
  message = 'Tem certeza que deseja continuar?',
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onConfirm}>
              <Text style={styles.deleteText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '500',
  },
})
