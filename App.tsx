import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Course = {
  id: string;
  title: string;
  lessons: number;
  progress: number;
  icon: string;
  color: string;
  background: string;
};

const courses: Course[] = [
  {
    id: 'ui',
    title: 'Thiết kế giao diện',
    lessons: 12,
    progress: 75,
    icon: '🎨',
    color: '#8B6CF6',
    background: '#F0EBFF',
  },
  {
    id: 'mobile',
    title: 'Lập trình di động',
    lessons: 16,
    progress: 60,
    icon: '📱',
    color: '#35B99A',
    background: '#E4F7F1',
  },
  {
    id: 'database',
    title: 'Cơ sở dữ liệu',
    lessons: 10,
    progress: 100,
    icon: '🗄️',
    color: '#F2A747',
    background: '#FFF3E0',
  },
  {
    id: 'english',
    title: 'Tiếng Anh chuyên ngành',
    lessons: 14,
    progress: 35,
    icon: '🌐',
    color: '#EF7183',
    background: '#FFECEF',
  },
];

const stats = [
  { id: 'courses', value: '08', label: 'Môn học', icon: '📚', color: '#7357E8' },
  { id: 'assignments', value: '12', label: 'Bài tập', icon: '📝', color: '#F0A43C' },
  { id: 'completed', value: '03', label: 'Hoàn thành', icon: '✅', color: '#2EAF8B' },
];

const navigation = [
  { id: 'home', label: 'Trang chủ', icon: '⌂' },
  { id: 'courses', label: 'Môn học', icon: '▤' },
  { id: 'assignments', label: 'Bài tập', icon: '✓' },
  { id: 'profile', label: 'Cá nhân', icon: '♙' },
];

function App() {
  const systemColorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <HomeScreen systemIsDark={systemColorScheme === 'dark'} />
    </SafeAreaProvider>
  );
}

function HomeScreen({ systemIsDark }: { systemIsDark: boolean }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [darkModeOverride, setDarkModeOverride] = useState<boolean | null>(null);
  const isDarkMode = darkModeOverride ?? systemIsDark;
  const styles = createStyles(isDarkMode);

  const filteredCourses = useMemo(
    () =>
      courses.filter(course =>
        course.title.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')),
      ),
    [query],
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 12) + 8 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.eyebrow}>THỨ HAI, 23 THÁNG 9</Text>
            <Text style={styles.hello}>Xin chào,</Text>
            <Text style={styles.studentName}>Minh Anh 👋</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              accessibilityLabel={isDarkMode ? 'Bật chế độ sáng' : 'Bật chế độ tối'}
              accessibilityRole="button"
              onPress={() => setDarkModeOverride(!isDarkMode)}
              style={({ pressed }) => [styles.themeButton, pressed && styles.pressed]}>
              <Text style={styles.themeButtonIcon}>{isDarkMode ? '☀' : '☾'}</Text>
            </Pressable>
            <Pressable
              accessibilityLabel="Thông báo"
              accessibilityRole="button"
              style={({ pressed }) => [styles.notificationButton, pressed && styles.pressed]}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationDot} />
            </Pressable>
            <Image
              accessibilityLabel="Ảnh đại diện của Minh Anh"
              source={{ uri: 'https://i.pravatar.cc/120?img=47' }}
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Tổng quan</Text>
          <Text style={styles.semester}>Học kỳ 1 · 2024–2025</Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map(stat => (
            <View key={stat.id} style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: `${stat.color}18` }]}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text numberOfLines={1} style={styles.statLabel}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            accessibilityLabel="Tìm kiếm môn học"
            onChangeText={setQuery}
            placeholder="Tìm kiếm môn học..."
            placeholderTextColor="#A3A8B8"
            returnKeyType="search"
            style={styles.searchInput}
            value={query}
          />
          {query.length > 0 && (
            <Pressable
              accessibilityLabel="Xóa nội dung tìm kiếm"
              onPress={() => setQuery('')}
              style={styles.clearSearch}>
              <Text style={styles.clearSearchText}>×</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.courseHeading}>
          <View>
            <Text style={styles.sectionTitle}>Môn học của tôi</Text>
            <Text style={styles.sectionCaption}>Tiếp tục hành trình học tập nhé!</Text>
          </View>
          <Text style={styles.courseCount}>{filteredCourses.length} môn</Text>
        </View>

        <View style={styles.courseList}>
          {filteredCourses.map(course => (
            <Pressable
              accessibilityRole="button"
              key={course.id}
              style={({ pressed }) => [styles.courseCard, pressed && styles.coursePressed]}>
              <View
                style={[
                  styles.courseIconWrap,
                  { backgroundColor: isDarkMode ? `${course.color}26` : course.background },
                ]}>
                <Text style={styles.courseIcon}>{course.icon}</Text>
              </View>
              <View style={styles.courseInfo}>
                <View style={styles.courseTitleRow}>
                  <Text numberOfLines={1} style={styles.courseTitle}>
                    {course.title}
                  </Text>
                  {course.progress === 100 && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>Xong</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.lessonCount}>{course.lessons} bài học</Text>
                <View style={styles.progressRow}>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${course.progress}%`, backgroundColor: course.color },
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressText, { color: course.color }]}>
                    {course.progress}%
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
          {filteredCourses.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔎</Text>
              <Text style={styles.emptyTitle}>Không tìm thấy môn học</Text>
              <Text style={styles.emptyCaption}>Thử tìm với từ khóa khác nhé.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        {navigation.map(item => {
          const isActive = activeTab === item.id;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              key={item.id}
              onPress={() => setActiveTab(item.id)}
              style={({ pressed }) => [styles.navItem, pressed && styles.pressed]}>
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{item.icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(isDarkMode: boolean) {
  const colors = isDarkMode
    ? {
        background: '#11141D',
        surface: '#1C2130',
        raisedSurface: '#252B3B',
        primaryText: '#F3F4F8',
        secondaryText: '#C0C5D2',
        mutedText: '#929AAF',
        subtleText: '#A8AEC0',
        track: '#363C4D',
        border: '#303647',
      }
    : {
        background: '#F7F8FC',
        surface: '#FFFFFF',
        raisedSurface: '#F0F1F6',
        primaryText: '#20263A',
        secondaryText: '#737B8E',
        mutedText: '#9299AA',
        subtleText: '#858C9D',
        track: '#EFF0F5',
        border: '#E9EAF0',
      };

  return StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  greeting: {
    flex: 1,
  },
  eyebrow: {
    color: colors.mutedText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  hello: {
    color: colors.secondaryText,
    fontSize: 15,
    lineHeight: 21,
  },
  studentName: {
    color: colors.primaryText,
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonIcon: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: '700',
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationIcon: {
    color: colors.primaryText,
    fontSize: 23,
    fontWeight: '600',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F16F83',
    borderWidth: 1,
    borderColor: colors.surface,
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 17,
    backgroundColor: colors.raisedSurface,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 13,
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.25,
  },
  semester: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 11,
    marginBottom: 19,
  },
  statCard: {
    flex: 1,
    minHeight: 119,
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 19,
    backgroundColor: colors.surface,
  },
  statIconWrap: {
    width: 31,
    height: 31,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 15,
  },
  statValue: {
    color: colors.primaryText,
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 25,
  },
  statLabel: {
    color: colors.subtleText,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  searchBox: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    marginBottom: 23,
  },
  searchIcon: {
    color: colors.mutedText,
    fontSize: 27,
    lineHeight: 31,
    marginRight: 9,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: colors.primaryText,
    fontSize: 13,
  },
  clearSearch: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.raisedSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSearchText: {
    color: colors.secondaryText,
    fontSize: 19,
    lineHeight: 22,
  },
  courseHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionCaption: {
    color: colors.mutedText,
    fontSize: 11,
    marginTop: 4,
  },
  courseCount: {
    color: '#755BEA',
    fontSize: 11,
    fontWeight: '700',
  },
  courseList: {
    gap: 10,
  },
  courseCard: {
    minHeight: 91,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 19,
    backgroundColor: colors.surface,
  },
  coursePressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  courseIconWrap: {
    width: 53,
    height: 53,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  courseIcon: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
    minWidth: 0,
  },
  courseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTitle: {
    flexShrink: 1,
    color: colors.primaryText,
    fontSize: 13,
    fontWeight: '700',
  },
  lessonCount: {
    color: colors.mutedText,
    fontSize: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: colors.track,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    width: 31,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '800',
  },
  completedBadge: {
    backgroundColor: isDarkMode ? '#173B34' : '#E7F7F0',
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 6,
  },
  completedText: {
    color: isDarkMode ? '#75D1B1' : '#269B77',
    fontSize: 8,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
    borderRadius: 19,
    backgroundColor: colors.surface,
  },
  emptyIcon: {
    fontSize: 27,
    marginBottom: 9,
  },
  emptyTitle: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyCaption: {
    color: colors.mutedText,
    fontSize: 11,
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 48,
  },
  navIcon: {
    color: isDarkMode ? '#858CA0' : '#A6ABBA',
    fontSize: 21,
    lineHeight: 23,
  },
  navIconActive: {
    color: '#755BEA',
    fontWeight: '800',
  },
  navLabel: {
    color: isDarkMode ? '#969DB1' : '#A0A5B3',
    fontSize: 9,
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#755BEA',
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
  });
}

export default App;
