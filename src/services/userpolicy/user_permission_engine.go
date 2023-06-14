package userpolicy

import "strings"

func ConvertPolicyToBitArray(permissions []string) []int {
	ans := make([]int, len(permissions))
	for _, permission := range permissions {
		ans = append(ans, int(M[permission].Number))
	}

	return ans
}

func PolicyNameList(permissionList []Permission) string {
	var out []string
	for _, permission := range permissionList {
		out = append(out, permission.Name)
	}
	return strings.Join(out, ", ")
}
